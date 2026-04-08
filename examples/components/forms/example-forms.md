---
name: form-component-examples
description: Examples and patterns for form components.
---

# FORM COMPONENT EXAMPLES

## DO

- Place form components under `components/ui/forms/`.
- Use `useThemeColor` for any color that must respond to light/dark mode — borders, text, backgrounds, and placeholders.
- Use `Pressable` for all custom interactive controls (checkbox, radio, select trigger, stepper buttons). Never use `View` without `Pressable` for tappable elements.
- Include `accessibilityRole`, `accessibilityLabel`, and `accessibilityState` on every interactive element.
- Set `accessibilityState={{ checked }}` for checkbox and radio, `accessibilityState={{ expanded }}` for select triggers, `accessibilityValue={{ min, max, now }}` for range controls like stepper.
- Use `Switch` from React Native for toggle — do not build a custom track/thumb from scratch.
- Use `FlatList` inside a `Modal` for select options — avoids new dependencies and works cross-platform.
- Use `minHeight: 44` on all touch targets.
- Spread relevant `TextInputProps` (e.g. `keyboardType`, `autoComplete`, `secureTextEntry`) on text field and text area components so callers don't need to wrap them.
- Use `textAlignVertical: "top"` on multiline `TextInput` (text-area) so text starts at the top on Android.

## DO NOT

- Hard-code colors — always pull from `Palette` (static) or `useThemeColor` (dynamic).
- Build a custom toggle track/thumb when `Switch` already handles it cross-platform.
- Use `ScrollView` inside a select modal — use `FlatList`.
- Add dependencies for controls that can be built from `Pressable` + `View` + `Modal`.
- Forget `ios_backgroundColor` on `Switch` — iOS ignores `trackColor.false` without it.
