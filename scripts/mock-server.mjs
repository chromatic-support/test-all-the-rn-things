/**
 * Local mock server for development.
 * Reads/writes JSON files in data/mocks/ so mutations persist across restarts.
 *
 * Endpoints:
 *   GET  /api/user               — active user record
 *   PATCH /api/user/favorites    — { flavorId, action: 'add'|'remove' }
 *   PATCH /api/user/wallet       — { action: 'add', card } | { action: 'remove', last4 }
 *   POST  /api/orders            — { items, shippingAddress, paymentMethod }
 *   GET  /api/orders             — orders for the active user
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '../data/mocks');
const PORT = 3001;

// 8.75% tax, free shipping over $35, 10 points per dollar spent
const TAX_RATE = 0.0875;
const FREE_SHIPPING_THRESHOLD = 35;
const SHIPPING_COST = 5.99;
const POINTS_PER_DOLLAR = 10;

// ---------------------------------------------------------------------------
// File helpers
// ---------------------------------------------------------------------------

function readJson(filename) {
  return JSON.parse(fs.readFileSync(path.join(DATA_DIR, filename), 'utf-8'));
}

function writeJson(filename, data) {
  fs.writeFileSync(path.join(DATA_DIR, filename), JSON.stringify(data, null, 2) + '\n');
}

function getActiveUser() {
  const data = readJson('users.json');
  const user = data.users.find((u) => u.id === data.activeUserId);
  if (!user) throw new Error(`No user found with id "${data.activeUserId}"`);
  return user;
}

function saveActiveUser(updatedUser) {
  const data = readJson('users.json');
  data.users = data.users.map((u) => (u.id === updatedUser.id ? updatedUser : u));
  writeJson('users.json', data);
}

// ---------------------------------------------------------------------------
// HTTP helpers
// ---------------------------------------------------------------------------

function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk) => { body += chunk.toString(); });
    req.on('end', () => {
      try { resolve(JSON.parse(body)); }
      catch { resolve({}); }
    });
  });
}

function respond(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(JSON.stringify(data));
}

// ---------------------------------------------------------------------------
// Server
// ---------------------------------------------------------------------------

const server = http.createServer(async (req, res) => {
  const method = req.method;
  const pathname = (req.url ?? '/').split('?')[0];

  if (method === 'OPTIONS') {
    respond(res, 204, {});
    return;
  }

  try {
    // GET /api/user
    if (method === 'GET' && pathname === '/api/user') {
      respond(res, 200, getActiveUser());
      return;
    }

    // PATCH /api/user/favorites
    if (method === 'PATCH' && pathname === '/api/user/favorites') {
      const { flavorId, action } = await parseBody(req);
      const user = getActiveUser();
      if (action === 'add' && !user.favorites.includes(flavorId)) {
        user.favorites.push(flavorId);
      } else if (action === 'remove') {
        user.favorites = user.favorites.filter((id) => id !== flavorId);
      }
      saveActiveUser(user);
      respond(res, 200, { favorites: user.favorites });
      return;
    }

    // PATCH /api/user/wallet
    if (method === 'PATCH' && pathname === '/api/user/wallet') {
      const body = await parseBody(req);
      const user = getActiveUser();
      if (body.action === 'add') {
        // First card becomes the default
        const isDefault = user.settings.wallet.cardOnFile.length === 0;
        user.settings.wallet.cardOnFile.push({ ...body.card, isDefault });
        user.settings.wallet.walletLinked = true;
      } else if (body.action === 'remove') {
        user.settings.wallet.cardOnFile = user.settings.wallet.cardOnFile.filter(
          (c) => c.last4 !== body.last4
        );
        if (user.settings.wallet.cardOnFile.length === 0) {
          user.settings.wallet.walletLinked = false;
        }
      }
      saveActiveUser(user);
      respond(res, 200, { wallet: user.settings.wallet });
      return;
    }

    // POST /api/orders
    if (method === 'POST' && pathname === '/api/orders') {
      // body.items: Array<{ itemId, title, price, quantity }>
      // body.shippingAddress: { name, street, apt?, city, state, zip }
      // body.paymentMethod: string
      const body = await parseBody(req);
      const user = getActiveUser();

      const subtotal = Math.round(
        body.items.reduce((sum, item) => sum + item.price * item.quantity, 0) * 100
      ) / 100;
      const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
      const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
      const total = Math.round((subtotal + shipping + tax) * 100) / 100;
      const pointsEarned = Math.floor(total * POINTS_PER_DOLLAR);

      const now = new Date();
      const orderId = `ORD-${now.getTime().toString(36).toUpperCase()}`;
      const today = now.toISOString().split('T')[0];

      const order = {
        id: orderId,
        userId: user.id,
        items: body.items,
        cost: { subtotal, shipping, tax, total },
        shippingAddress: body.shippingAddress ?? null,
        paymentMethod: body.paymentMethod ?? 'unknown',
        status: 'placed',
        pointsEarned,
        placedAt: now.toISOString(),
      };

      // Persist order record
      const ordersData = readJson('orders.json');
      ordersData.orders.push(order);
      writeJson('orders.json', ordersData);

      // Update user: purchase history entry per line item
      for (const item of body.items) {
        const itemPoints = Math.floor(item.price * item.quantity * POINTS_PER_DOLLAR);
        user.purchaseHistory.unshift({
          itemId: item.itemId,
          quantity: item.quantity,
          orderedAt: today,
          pointsEarned: itemPoints,
        });
      }

      // Update user rewards balance + history
      user.rewards.pointsBalance += pointsEarned;
      user.rewards.history.unshift({
        type: 'earned',
        points: pointsEarned,
        description: `Purchase: ${orderId}`,
        date: today,
      });

      saveActiveUser(user);

      respond(res, 201, { orderId, orderNumber: orderId, pointsEarned, cost: { subtotal, shipping, tax, total } });
      return;
    }

    // GET /api/orders
    if (method === 'GET' && pathname === '/api/orders') {
      const user = getActiveUser();
      const ordersData = readJson('orders.json');
      const userOrders = ordersData.orders.filter((o) => o.userId === user.id);
      respond(res, 200, userOrders);
      return;
    }

    respond(res, 404, { error: `No handler for ${method} ${pathname}` });
  } catch (err) {
    console.error('[mock-server] Error:', err.message);
    respond(res, 500, { error: err.message });
  }
});

server.listen(PORT, () => {
  console.log(`\n[mock-server] http://localhost:${PORT}\n`);
});
