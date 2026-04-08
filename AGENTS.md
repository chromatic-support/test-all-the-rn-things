# PROJECT RULES FOR AGENTS

## REPO CONTEXT

- This is a React Native project with a Storybook app.

## EXAMPLES

- The `./examples` directory contains different work examples and patterns.
- Follow these patterns to make consistent decisions based on the patterns in the directory.
- When adding new examples, organize by what decision they help make. For instance, adding an example for writing a story using CSF should go under `examples/stories/story-csf.example.tsx`.
- For each subdirectory under `./examples`, there should be a markdown file with the subdirectories name. For instance `./examples/components` should contain a markdown file `./examples/components/example-components.md`. This file is where general DO/DO NOT tips should be added.
- When adding a new general tip instead of a full example, add it to the `example-*.md` file in the subdirectory and if the file does not yet exist, create one.
- When adding an example and the file does not exist, add a comment above with `@ts-expect-error: this is an example path, error expected`.

## TECH STACK

- React Native + TypeScript
- Expo (expo-router for file-based navigation)
- npm
- Storybook for React Native (`@storybook/react-native`) for UI development
- React Navigation (bottom tabs) with expo-router's Stack for stack navigation

## DO:

- Prefer existing patterns in the repo
- Optimize for readability over cleverness
- Avoid adding dependencies unless it's necessary
- Provide visual feedback for press interactions (e.g. `Pressable` style callback)
- Keep components cross-platform by default — see `examples/components/example-react-native.md` for iOS/Android conventions, safe area usage, accessibility, and list/form patterns
- Return complete, runnable components
- Avoid unused imports

## DO NOT:

- Hallucinate component properties
- Refactor unrelated files
- Rename variables outside of scope
- Introduce abstractions
- Create large scrollable feeds with `ScrollView` instead of `FlatList`
- Build custom buttons from plain `View` without `Pressable`
- Use `TouchableOpacity` or other legacy touchables unless explicitly requested
- Omit accessibility props (`accessibilityRole`, `accessibilityLabel`, `accessibilityState`) for interactive elements
- Omit accessibility state for disabled or selected controls
- Use deprecated `SafeAreaView`
- Treat every visual difference as a reason to split into separate iOS and Android components
- Forget explicit dimensions for remote images
- Assume web behavior (no divs, no CSS assumptions)

## CODE STYLE

- Follow patterns in `./examples`.
- Use uppercase for `README.md` headers.
- Use named exports.
- Use absolute imports from `@/`.
- Leave a comment to indicate that an import is shared in global files, project configuration files (especially ones in the `.rnstorybook` dirs), component files, and story files.

## PREFERRED DEFAULTS FOR GENERATED CODE

- TypeScript
- Function components
- `StyleSheet.create`
- `Pressable` for custom interactions
- `FlatList` / `SectionList` for non-trivial lists
- `KeyboardAvoidingView` for forms
- Accessibility labels, roles, and state where relevant
- Minimal, localized use of Platform.select

## DECISION RULES

### Lists

- If list size is unknown or may grow → use `FlatList`
- If list is small and static (2–5 items) → `View` + `.map()` is acceptable

### Interaction

- If user taps something → use `Pressable`
- If component needs press states → use `Pressable` style callback

### Forms

- If input fields are present → wrap in `KeyboardAvoidingView`
- If input type is known: email → `keyboardType="email-address"`, numeric → `keyboardType="numeric"`

### Platform differences

- If only styles differ → use `Platform.select`
- If behavior differs significantly → isolate logic, do not fork the entire component

### Accessibility

- If element is interactive → must include `accessibilityRole` and `accessibilityLabel`
- If element can be disabled → include `accessibilityState`

### Selected state text

- Unless specified by user, text color must always come from the theme (`useThemeColor`) regardless of selected state
- Selected state should only increase font weight, never change text color

## DEPENDENCY MANAGEMENT

- Keep runtime dependencies in `dependencies`.
- Use `devDependencies` for build tools.
- Avoid using dev-only packages in any Storybook preview files (`.rnstorybook/preview.ts`).
- In Storybook preview files and other shared utility files, always use direct imports instead of dynamic imports.

## DATA MOCKS

- `data/mocks/*.ts` — static mock data imported directly by stories and tests. Export typed constants; do not import `.json` files here unless necessary.
- `data/mocks/*.json` — runtime state read and written by the mock server (`scripts/mock-server.mjs`). Do not import these directly in stories; use the `.ts` wrapper instead.
- `data/mocks/user.ts` exports the active flat `User` object (resolved from `users.json` by `activeUserId`). Import `@/data/mocks/user` to get a typed `User`, not the raw multi-user JSON.

## SAFE AREA

- Only `Modal`-based overlays (e.g. `MobileNavDrawer`) should use `useSafeAreaInsets` — they render at y=0 and genuinely need it.
- Layout flow components (headers, nav bars) must NOT call `useSafeAreaInsets`. The app's navigation layer (expo-router) handles top safe area positioning.
- Never apply `paddingTop: insets.top` to a wrapper View around a component — it creates visible whitespace using the wrapper's background color. The inset must live inside the component's own background.
- If a component needs both a fixed content height and a top inset, render them as two separate children: a `<View style={{ height: topInset }} />` spacer and a fixed-height content row. Do not use `paddingTop` on a fixed-height container — it pushes content off-center.
- Do NOT add a global `SafeAreaProvider` decorator to `.rnstorybook/preview.tsx`. It appears to fix layout whitespace but silently breaks any story using a `Modal`.
- `AppShell` applies `paddingTop: insets.top` to its root shell View and `paddingBottom: insets.bottom` to its footer slot. Nav and header slots receive no additional padding — the shell root's top inset covers them.

## STORYBOOK

- Remember: A story name might not reflect the property name correctly, so always verify properties through documentation or example stories before using them.
- Every component must include a story.
- Use CSF format.
- Avoid unnecessary decorators.
- Stories live in `components/stories/` and mirror the component directory structure. The glob in `.rnstorybook/main.ts` is `../components/stories/**/*.stories.?(ts|tsx|js|jsx)`. After adding or moving story files, regenerate `storybook.requires.ts` with `npm run storybook-generate`.
- `useUser()` throws if called outside a `UserProvider`. The Storybook tree does not include `UserProvider` — stories for screens that call `useUser()` must either pass user data directly as props or provide a decorator with the provider.

## CHROMATIC

- Do not disable snapshots unless explicitly requested.
- Each Storybook project should have a [Chromatic config file](https://www.chromatic.com/docs/cli/#chromatic-config-file) at the root of the project that includes the [schema](https://www.chromatic.com/config-file.schema.json).

### REACT NATIVE

- Stories cannot be disabled via Storybook parameters. To exclude a story from a Chromatic build, remove its `storyId` from `chromatic.include.json` — the `generate-manifest` script filters the manifest to that list automatically.
- Disable all Storybook addons (empty `addons: []` in `.rnstorybook/main.ts`) for Chromatic builds — on-device UI addons are unnecessary and can interfere with capture.
- `StorybookUI` must be the only thing rendered when building for Chromatic. Gate it with `EXPO_PUBLIC_STORYBOOK_ENABLED=true`. Do not put the conditional inside the component body (this violates `react-hooks/rules-of-hooks`); instead, select between a `StorybookLayout` wrapper and the app layout at the module level and export the result as default. A wrapper component (not a bare require) is needed so lifecycle hooks like `SplashScreen.hideAsync` can be called on mount.
- For managed Expo projects (no `android`/`ios` directories), run `expo prebuild --clean` before any native build. `expo prebuild` generates the native project but does NOT bundle JS — the bundle is created by Gradle/xcodebuild. `EXPO_PUBLIC_*` env vars must therefore be set on both commands, not just on `expo prebuild`.
- `EXPO_PUBLIC_*` env vars are inlined by Metro at JS bundle time. In the build scripts, `VAR=value cmd1 && cmd2` only sets the var for `cmd1`. Set `EXPO_PUBLIC_STORYBOOK_ENABLED=true` explicitly on both the `expo prebuild` command AND the `./gradlew assembleRelease` / `xcodebuild` command, otherwise `RootLayout` compiles to `AppLayout` and Chromatic has no Storybook to connect to — causing a 15s bootstrap timeout on every story.
- `SplashScreen.preventAutoHideAsync()` is called at module level in `_layout.tsx`. When `StorybookUI` is the root, `AppLayout` never mounts so `SplashScreen.hideAsync()` is never called — Chromatic times out after 15s. Fix: use a `StorybookLayout` wrapper component that calls `SplashScreen.hideAsync()` in a `useEffect`.
- The iOS build for Chromatic does not need to be signed. Pass `CODE_SIGNING_ALLOWED=NO` to `xcodebuild` and target the simulator SDK (`-sdk iphonesimulator`).
- `getStorybookUI` requires these options for Chromatic capture: `enableWebsockets: true`, `host: 'react-native.capture.chromatic.com'`, `port: 7007`, `secured: true`. Also set `shouldPersistSelection: false` and `onDeviceUI: __DEV__` — the latter keeps the on-device toolbar available in local dev while disabling it automatically in release builds for Chromatic.
- `manifest.json` is generated by `npx chromatic generate-manifest -o <dir>` (requires Chromatic CLI v15.3.0+). Pass the directory without a leading dot (e.g. `storybook-static`, not `.storybook-static`) — a leading dot causes Chromatic to resolve the path as absolute (`/storybook-static`), which fails with a permissions error.
- Chromatic validates the upload directory against the project's configured capture platforms (`browsers` field from the API). If the Chromatic project does not have Android and/or iOS configured as capture targets in the dashboard, validation will fail with "Invalid React Native Storybook build" even if all files are present and correctly named.
- Do not use `@react-native-async-storage/async-storage` v3 — its `storage-android:1.0.0` Maven artifact is not published, causing Android release builds to fail. Use an in-memory fallback for Storybook storage, or downgrade to v2 if persistence is required.
- Never give a `.ts` file and a `.json` file the same base name in the same directory. Metro resolves bare imports (e.g. `@/data/mocks/user`) by preferring `.json` over `.ts`, so `user.json` will silently shadow `user.ts`. If stories import the `.ts` module but the bundle resolves to `.json`, module-level code that expects the typed export will crash and Chromatic will report every story in that file as "not found."
- Always rebuild both the iOS `.app` and Android `.apk` when any Metro-affecting code changes (story file paths, mock data imports, new context providers). A stale binary from before a rename or directory move will cause Chromatic capture errors on that platform while the freshly-built platform appears clean. Run `npm run clean:chromatic` to remove stale artifacts before rebuilding.
