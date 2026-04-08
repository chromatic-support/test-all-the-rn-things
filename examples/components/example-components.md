---
name: component-examples
description: Examples and patterns for writing React Native components.
---

# COMPONENT EXAMPLES

## DO

- Use named exports for all components.
- Use `StyleSheet.create` for component-level styles.
- Use absolute imports from `@/` for internal references.
- Verify all component properties via documentation or example stories before use — never assume a prop exists.
- Keep components focused on a single responsibility.
- Pair each component with a story in CSF format.
- Place the component in the `components/ui` directory.
- Provide explicit `width` and `height` dimensions for network images — React Native cannot infer dimensions from a remote URL.

## DO NOT

- Use inline styles; prefer `StyleSheet.create`.
- Assume component props based on naming conventions from other libraries.
- Introduce new abstractions unless clearly required by more than one use case.
- Refactor unrelated components while working on a specific one.
- Add dependencies for functionality that can be achieved with existing packages.
