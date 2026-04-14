# TEST ALL THE RN THINGS

<table>
<tr>
<td valign="top" width="60%">

A React Native app built with Expo for exploring patterns, components, and UI testing workflows. Includes a full Storybook setup and Chromatic visual testing pipeline.

The app is built around **Monstera Energy Drink**, a fictional energy drink brand used as a realistic commerce context. The brand gives the app a concrete domain — product menus, flavor detail pages, a shopping cart, rewards, and checkout — without requiring a real backend or live data. Everything is driven by a local mock server and static JSON fixtures, making it a self-contained environment for building and testing UI patterns that reflect real-world commerce app complexity.

</td>
<td valign="top" align="right">

<img src="https://raw.githubusercontent.com/chromatic-support/test-all-the-rn-things/main/assets/gif/dev-mode.gif" height="600">

</td>
</tr>
</table>

## TECH STACK

- **React Native** + **TypeScript**
- **Expo** with `expo-router` for file-based navigation
- **Reanimated** (`react-native-reanimated`) for UI-thread animations
- **Storybook for React Native** (`@storybook/react-native`) for component development
- **Chromatic** for visual regression testing

## PREREQUISITES

### iOS

Requires **Xcode** with the iOS Simulator. Install Xcode from the Mac App Store, then open it once to accept the license and install the command-line tools. You can manage simulator devices in **Xcode → Window → Devices and Simulators**.

### Android

Requires **Android Studio** with at least one Android Virtual Device (AVD). After installing Android Studio, open the **Virtual Device Manager** (the phone icon in the toolbar) and create a device. Make sure the AVD is running before calling `npm run android`.

Both platforms also require the **Expo CLI** and **Watchman**, which you can install via Homebrew:

```sh
brew install watchman
npm install -g expo-cli
```

For full environment setup instructions, see the [React Native environment setup guide](https://reactnative.dev/docs/set-up-your-environment).

## GET STARTED

Install dependencies:

```sh
npm install
```

Run on iOS (with mock server):

```sh
npm run ios
```

Run on Android (with mock server):

```sh
npm run android
```

Or start Metro without targeting a specific platform:

```sh
npm start          # with mock server
npm run start:app  # without mock server
```

## NAVIGATING THE APP

The app boots directly into the main tab navigator. Navigation is handled by a bottom tab bar with five items: **Flavors**, **Shop**, **Home**, **Find**, and **More**.

**More** opens a slide-in drawer with links to the remaining screens (Rewards, Cart, About, Contact). In development builds only, the drawer also shows a **Storybook** entry that navigates to the full on-device Storybook UI. This entry is stripped out in production — it is injected via a `__DEV__` guard in `app/(tabs)/_layout.tsx`.

To launch Storybook directly at startup instead of navigating to it from the drawer, set `EXPO_PUBLIC_STORYBOOK_ENABLED=true` when starting the app. This replaces the entire app with the Storybook UI root — there is no tab bar or drawer in this mode.

```sh
EXPO_PUBLIC_STORYBOOK_ENABLED=true npm run ios
EXPO_PUBLIC_STORYBOOK_ENABLED=true npm run android
```

## AGENTIC DEVELOPMENT

This repo is set up to work well with AI coding agents (Claude Code, Cursor, Copilot Workspace, etc.). Two files are the primary sources of truth for agents working in this codebase:

### AGENTS.md

`AGENTS.md` at the repo root contains all project-level rules for agents: tech stack, code style, DO/DO NOT constraints, decision rules for lists, interactions, forms, platform differences, accessibility, safe area usage, Storybook conventions, and Chromatic build notes. Agents should treat this file as the authoritative guide for any decision not directly answered by the existing code.

### examples/

The `examples/` directory contains concrete, runnable code examples and `example-*.md` guidance files organized by topic. Before generating any new component, story, or data file, agents should check the relevant subdirectory:

| Directory                       | What it covers                                                                 |
| ------------------------------- | ------------------------------------------------------------------------------ |
| `examples/components/`          | React Native component patterns, button and card shapes, list and form screens |
| `examples/components/forms/`    | Form layout, `KeyboardAvoidingView`, input conventions                         |
| `examples/components/overlays/` | Modal and drawer patterns                                                      |
| `examples/stories/`             | CSF story format, decorator usage, `useArgs` vs `useState`                     |
| `examples/data/`                | Mock data conventions, `.ts` vs `.json` file rules                             |
| `examples/docs/`                | Documentation conventions                                                      |

Each subdirectory's `example-*.md` file lists general DO/DO NOT tips for that topic. Concrete file examples (e.g. `story-csf.example.tsx`) show the full, preferred shape of a given file type.

When adding a new example, place it in the subdirectory that matches its decision type and follow the naming convention `<topic>.example.tsx`. Add a `@ts-expect-error: this is an example path, error expected` comment above any import that uses a non-existent path.

## PROJECT STRUCTURE

```
app/                        # Expo Router screens (file-based routing)
  (tabs)/                   # Bottom tab navigator
    index.tsx               # Home
    shop/                   # Shop (menu + detail)
    flavors/                # Flavors menu + detail
    rewards.tsx             # Rewards
    cart.tsx                # Cart
    about.tsx               # About
    contact.tsx             # Contact
    find.tsx                # Find a store
components/
  screens/                  # Full-screen components (one per route)
  composites/               # Feature-level compositions (grouped by domain)
  ui/                       # Low-level primitives, forms, layout, navigation, overlays
  stories/                  # Storybook stories (mirrors component structure)
data/
  *.json                    # Static app data (flavors, shop, rewards, etc.)
  schema.ts                 # Shared TypeScript types
  mocks/
    *.ts                    # Static mock data for stories (import directly)
    *.json                  # Runtime state for the mock server (do not import in stories)
context/                    # React context providers (UserProvider, CartProvider, etc.)
scripts/
  mock-server.mjs           # Local HTTP mock server (runs on port 3001)
  filter-manifest.js        # Filters Chromatic manifest to chromatic.include.json
.rnstorybook/               # Storybook configuration (main.ts, preview.tsx)
examples/                   # Code patterns and DO/DO NOT guidance for this repo
```

## MOCK SERVER

The mock server simulates a backend API for local development. It reads and writes JSON files in `data/mocks/` so mutations persist across restarts.

```sh
node scripts/mock-server.mjs
```

Available endpoints:

| Method  | Path                  | Description                  |
| ------- | --------------------- | ---------------------------- |
| `GET`   | `/api/user`           | Active user record           |
| `PATCH` | `/api/user/favorites` | Add or remove a favorite     |
| `PATCH` | `/api/user/wallet`    | Add or remove a payment card |
| `POST`  | `/api/orders`         | Place an order               |
| `GET`   | `/api/orders`         | Orders for the active user   |

### SWITCHING USERS

The active user is controlled by the `activeUserId` field in `data/mocks/users.json`. Change it to any of the available user IDs and restart the mock server.

| ID          | Name        | Notes                                              |
| ----------- | ----------- | -------------------------------------------------- |
| `user-001`  | Alex Rivera | Default — has purchase history and rewards balance |
| `user-002`  | Jordan Kim  | Alternate user                                     |
| `user-anon` | Guest #2847 | No email, simulates a guest/anonymous user         |

```json
// data/mocks/users.json
{
  "activeUserId": "user-002",
  ...
}
```

## STORYBOOK

Stories live in `components/stories/` and mirror the component directory structure.

After adding or moving story files, regenerate the story registry:

```sh
npm run storybook-generate
```

## CHROMATIC

Visual regression testing is handled by Chromatic. Build artifacts (`.apk`, `.app`, `storybook-static/`) are gitignored.

### SCRIPTS

| Script                            | Description                                                                           |
| --------------------------------- | ------------------------------------------------------------------------------------- |
| `npm run build:chromatic`         | Full build: generate stories, build both platforms, generate manifest, prepare upload |
| `npm run build:chromatic:ios`     | iOS-only build                                                                        |
| `npm run build:chromatic:android` | Android-only build                                                                    |
| `npm run generate-manifest`       | Generate and filter `storybook-static/manifest.json`                                  |
| `npm run clean:chromatic`         | Remove stale `.apk`, `.app`, and `storybook-static/`                                  |
| `npm run chromatic`               | Upload `storybook-static/` to Chromatic                                               |
| `npm run open:storybook:ios       | Open the built iOS Storybook for debugging                                            |
| `npm run open:storybook:android   | Open the built Android Storybook for debugging                                        |

### WORKFLOW

```sh
npm run clean:chromatic
npm run build:chromatic
npm run chromatic
```

To rebuild a single platform after a change:

```sh
npm run clean:chromatic
npm run build:chromatic:ios   # or :android
npm run chromatic
```

### INCLUDE LIST

`chromatic.include.json` controls which story IDs appear in `storybook-static/manifest.json`. The `generate-manifest` script filters the manifest down to this list automatically.

The list exists because `npx chromatic generate-manifest` produces a manifest for every story in the project. Without filtering, every new story is automatically enrolled in Chromatic captures — including work-in-progress stories that aren't ready for visual review, and stories that exist purely for local development or documentation. The include list makes enrollment explicit: a story only enters Chromatic when it is deliberately added here.

To add a story, find its `storyId` in `storybook-static/manifest.json` and add it to the `includedStoryIds` array in `chromatic.include.json` before running `npm run generate-manifest`.
