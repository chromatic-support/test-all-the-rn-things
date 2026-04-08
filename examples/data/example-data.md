---
name: data-examples
description: Examples and patterns for mock data used in stories, screens, and tests.
---

# DATA EXAMPLES

## DO

- Place all mock data in `data/mocks/` as `.ts` or `.json` files.
- Use `.json` files for data that the mock server reads and writes at runtime (e.g. `users.json`, `orders.json`).
- Use `.ts` files for static mock data imported directly by stories or components (e.g. `checkout.ts`, `shop.ts`).
- Export typed constants from `.ts` mock files so stories get type-checking on their args.
- Name mock files after the domain they represent (e.g. `checkout.ts` for order items and cost breakdowns used in checkout stories).
- Import mock data in stories with a `// mock data` comment.

## DO NOT

- Inline mock data directly inside story `args` when the same data is needed by more than one story.
- Import `.json` mock files that the mock server writes to — treat those as runtime state, not static imports.
- Create mock files for data that is already derivable from existing source files (e.g. `shop.json` is the source of truth for shop items — don't duplicate it).
