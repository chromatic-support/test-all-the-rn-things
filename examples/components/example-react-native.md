---
name: react-native-guide
description: Guide for building React Native UI for iOS and Android — native patterns, accessibility, and platform conventions.
---

# React Native agent guide

This guide is based on the current React Native documentation and is intended for building app UI and components for **iOS and Android**. Prefer native React Native patterns over web assumptions, and optimize for accessibility, platform conventions, and list performance.

---

## Core principles

- Use React Native **core components** like `View`, `Text`, `Image`, `TextInput`, `Pressable`, `FlatList`, and `SectionList` as the default building blocks.
- Treat React Native as **native UI**, not the web. Layout, text, touch behavior, keyboard handling, and accessibility should follow mobile conventions.
- Prefer **small cross-platform components** with narrowly scoped platform differences using `Platform.OS`, `Platform.select`, or platform-specific files only when needed.
- Build for **accessibility by default** so components work with VoiceOver on iOS and TalkBack on Android.

---

## Dos

### Structure and layout

- **Do** compose UI with `View` and `Text` rather than assuming HTML-like primitives exist. `View` is the fundamental layout container in React Native.
- **Do** use React Native layout and style props intentionally rather than relying on browser CSS behavior.
- **Do** keep platform-specific logic minimal and localized with `Platform.select` or `Platform.OS`.

### Interaction

- **Do** prefer `Pressable` for custom tappable UI. It is the recommended, future-facing touch primitive for handling press states.
- **Do** provide visible feedback for pressable elements. React Native explicitly warns against touch targets with no feedback except for unusual cases.

### Inputs and forms

- **Do** use `TextInput` with the right props for the job, such as `keyboardType`, `autoCapitalize`, `autoCorrect`, `onChangeText`, and `onSubmitEditing`.
- **Do** use `KeyboardAvoidingView` for screens with form fields so content stays visible when the keyboard opens. React Native notes that using `behavior` is recommended on both iOS and Android, though the platforms handle it differently.

### Lists and performance

- **Do** use `FlatList` for long flat collections and `SectionList` for grouped data. They are designed for performant rendering across platforms.
- **Do** tune `FlatList` thoughtfully when performance matters, including things like `initialNumToRender`. React Native documents this as an important performance lever.

### Accessibility

- **Do** set accessibility labels, roles, hints, and state when a component's meaning is not already obvious. React Native exposes dedicated accessibility APIs because iOS and Android assistive technologies differ somewhat.
- **Do** ensure interactive controls communicate disabled, selected, expanded, or busy states where applicable.

### Images and safe areas

- **Do** provide explicit dimensions for network and data URI images. React Native's `Image` docs call this out directly.
- **Do** use `react-native-safe-area-context` rather than React Native's built-in `SafeAreaView`, which is now deprecated.
- **Do** use `useSafeAreaInsets()` for content inside `Modal` components — Modals do not inherit the safe area context automatically, so the top inset must be applied manually to avoid content sitting under the camera notch or status bar.
- **Do** use `StyleSheet.absoluteFillObject` and `position: 'absolute'` to layer an overlay panel (drawer, sheet) over a full-screen backdrop. A side-by-side row layout will only darken the area beside the panel, not behind it.

---

## Don'ts

- **Don't** treat React Native like the DOM. Avoid web-only assumptions around tags, CSS behavior, hover-centric UX, or browser layout expectations.
- **Don't** use `ScrollView` for large, dynamic lists when `FlatList` or `SectionList` is more appropriate. React Native recommends list views because they render more efficiently than rendering everything at once.
- **Don't** reach for older touchables first when building new tappable components. `TouchableOpacity` and related APIs point developers toward `Pressable` for a more future-proof approach.
- **Don't** hide all touch feedback unless there is a very strong reason. React Native specifically advises against using `TouchableWithoutFeedback` casually.
- **Don't** use the deprecated built-in `SafeAreaView` as the default safe-area solution.
- **Don't** forget that keyboard behavior, accessibility behavior, and some UI conventions differ between iOS and Android. Test both.

