---
name: story-examples
description: Examples and patterns for working with stories in Storybook.
---

# STORY EXAMPLES

## DO

- Use CSF (Component Story Format) for all stories.
- Every component must have at least one story.
- Each story file should have a `Default` story.
- Name story files to match the component file (e.g., `Button.stories.tsx` for `Button.tsx`).
- Keep story files located in the `components/stories/` directory, mirroring the component structure (e.g. `components/stories/screens/`, `components/stories/composites/`).

## DO NOT

- Use `default export` for stories — use named exports.
- Add unnecessary decorators; only add them when strictly required.
- Hallucinate component props — always confirm via documentation or example stories.
- Use story names as a source of truth for prop names; always verify against the docs.
- Disable Chromatic snapshots unless explicitly requested.
- Pass no-op handlers (`() => {}`) for controlled component props — use `useArgs` instead so every story is interactive.
- Pass functions inside nested args objects (e.g. `items[].onPress`, `links[].onPress`) — Storybook's args serialization strips them silently. Wire those handlers up inside a `render` function instead.
- Use a no-op `onClose` or `onRequestClose` on Modal-based components — the user will be unable to dismiss the modal or navigate away from the story.

## CONTROLLED COMPONENTS

For any component that manages value state (inputs, checkboxes, toggles, etc.), add a `render` at the **meta** level using `useArgs` from `storybook/preview-api`. This makes every story in the file interactive and keeps the controls panel in sync — no separate `Interactive` story needed.

```tsx
import { useArgs } from "storybook/preview-api";

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  args: { label: "Accept terms", checked: false },
  render: function Render(args) {
    const [{ checked }, updateArgs] = useArgs<typeof args>();
    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(val: boolean) => updateArgs({ checked: val })}
      />
    );
  },
};
```

Group stories that need their own multi-instance state (e.g. a radio group) can still override `render` at the story level.

## REUSING STORIES IN OTHER STORIES

When a story needs to embed a fully interactive component from another story file, export a named component function (not just a `Story` object) from the source file and import it with a `// story component` comment in the consuming file.

Use this pattern when:
- The component has its own internal state that must stay alive inside the parent story (e.g. a nav bar that tracks the active tab)
- You want to avoid duplicating a complex render setup across multiple story files

**Source file** — export a named component function alongside the story:

```tsx
// primary-nav.stories.tsx
export function MonsteraNavBar() {
  const [activeKey, setActiveKey] = useState('home');
  return (
    <PrimaryNav
      items={ITEMS.map((item) => ({ ...item, onPress: () => setActiveKey(item.key) }))}
      activeKey={activeKey}
    />
  );
}

export const MonsteraNav: Story = {
  render: () => <MonsteraNavBar />,
};
```

**Consuming file** — import the component function, not the story object:

```tsx
// app-shell.stories.tsx

// story component
import { MonsteraNavBar } from '../navigation/primary-nav.stories';

export const WithNav: Story = {
  render: () => (
    <AppShell nav={<MonsteraNavBar />}>
      <SampleContent label="Content area" />
    </AppShell>
  ),
};
```

Do NOT spread story args or import the `Story` object itself — that pattern does not carry self-contained state and leads to wiring args manually in every consuming story.

## MODAL AND OVERLAY STORIES

`useArgs` mutations persist in the args store across story navigation. Choose between `useArgs` and `useState` based on what the story is demonstrating:

- **`useArgs`** — use when the story is interactive and the controls panel should reflect the current state (e.g. a button that opens/closes a drawer).
- **`useState`** — use when the story demonstrates a fixed visual state (e.g. a drawer that is always open). Local state resets on every navigation because the component remounts, so the story always starts fresh.

```tsx
// ✅ Static "open" state — resets correctly on navigation
export const Open: Story = {
  render: function Render(args: DrawerProps) {
    const [visible, setVisible] = useState(true);
    const close = () => setVisible(false);
    return <Drawer {...args} visible={visible} onClose={close} />;
  },
};

// ✅ Interactive "trigger" story — controls panel stays in sync
export const Default: Story = {
  render: function Render(args: DrawerProps) {
    const [{ visible }, updateArgs] = useArgs<DrawerProps>();
    return (
      <View>
        <Button title="Open" onPress={() => updateArgs({ visible: true })} />
        <Drawer
          {...args}
          visible={visible ?? false}
          onClose={() => updateArgs({ visible: false })}
        />
      </View>
    );
  },
};
```
