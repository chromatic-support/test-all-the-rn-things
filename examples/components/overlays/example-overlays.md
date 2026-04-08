---
name: overlay-component-examples
description: Examples and patterns for overlay components such as modals, drawers, and alerts.
---

# OVERLAY COMPONENT EXAMPLES

## DO

- Use `Modal` (RN) internally for overlays that must appear above all content regardless of tree position (Alert, Drawer, Modal).
- Use `Animated.View` with `position: 'absolute'` for non-blocking overlays like Toast — render it as the last child of the screen root so it layers above siblings.
- Always pass a functional `onClose` / `onDismiss` in stories — a no-op blocks all Storybook navigation and interaction.
- Use `useState` (not `useArgs`) for stories where the overlay should start open and reset on story navigation.
- Use `useArgs` for the `Default` story so Storybook controls stay in sync with the visible state.
- Use `accessibilityViewIsModal` on `Modal` (RN) components so VoiceOver/TalkBack restricts focus to the overlay.
- Wire nested `onPress` callbacks (e.g. action buttons inside Alert) inside the `render` function, not in `args` — Storybook strips functions from serialized args.
- Use `useSafeAreaInsets` for overlays that position content near screen edges (Drawer, Toast).
- Animate Drawer and Modal entry/exit manually with `Animated.timing` and a local `modalVisible` state so the exit animation plays before the Modal unmounts.

## DO NOT

- Pass a no-op `() => {}` as `onClose` or `onDismiss` in stories — it prevents the overlay from closing and blocks Storybook navigation.
- Use `Modal` (RN) for Toast — it captures all touch events and prevents the user from interacting with content behind it while the toast is visible.
- Skip the `accessibilityRole` and `accessibilityLabel` on backdrop `Pressable` components.
- Forget to handle Android back button via `onRequestClose` on `Modal`.
- Use `animationType="slide"` or `animationType="fade"` on `Modal` when driving custom animations — set it to `"none"` and handle the animation yourself to avoid conflicts.
