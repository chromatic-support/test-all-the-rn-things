import { StyleSheet, Text, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { Card } from '@/components/ui/primatives/card';
// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from '@/constants/theme';

const meta: Meta<typeof Card> = {
  title: 'Components/Primatives/Card',
  component: Card,
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {
  render: () => (
    <View style={styles.wrapper}>
      <Card>
        <Text style={styles.title}>Card title</Text>
        <Text style={styles.body}>This is a simple static card with a title and body text.</Text>
      </Card>
    </View>
  ),
};

export const Pressable: Story = {
  render: () => (
    <View style={styles.wrapper}>
      <Card onPress={() => {}} accessibilityLabel="Open card">
        <Text style={styles.title}>Tappable card</Text>
        <Text style={styles.body}>Press this card to trigger an action.</Text>
      </Card>
    </View>
  ),
};

export const WithBadge: Story = {
  render: () => (
    <View style={styles.wrapper}>
      <Card>
        <View style={styles.row}>
          <Text style={styles.title}>New feature</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeLabel}>New</Text>
          </View>
        </View>
        <Text style={styles.body}>
          This card shows how to pair a badge with a card header.
        </Text>
      </Card>
    </View>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <View style={styles.wrapper}>
      <Card>
        <Text style={styles.title}>Card with footer</Text>
        <Text style={styles.body}>
          Use a footer area to surface metadata or secondary actions.
        </Text>
        <View style={styles.footer}>
          <Text style={styles.meta}>Updated 2 hours ago</Text>
        </View>
      </Card>
    </View>
  ),
};

export const List: Story = {
  render: () => (
    <View style={styles.wrapper}>
      {['First card', 'Second card', 'Third card'].map((title) => (
        <Card key={title} onPress={() => {}} accessibilityLabel={title}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.body}>Supporting detail text for this item.</Text>
        </Card>
      ))}
    </View>
  ),
};

const styles = StyleSheet.create({
  wrapper: {
    padding: Spacing[4],
    gap: Spacing[3],
  },
  title: {
    fontSize: FontSize.base,
    fontFamily: FontWeight.semibold,
    marginBottom: Spacing[1],
  },
  body: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.normal,
    opacity: 0.7,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing[1],
  },
  badge: {
    backgroundColor: Palette.mint,
    paddingHorizontal: Spacing[2],
    paddingVertical: 2,
    borderRadius: 99,
  },
  badgeLabel: {
    fontSize: FontSize.xs,
    fontFamily: FontWeight.medium,
    color: Palette.gray800,
  },
  footer: {
    marginTop: Spacing[3],
    paddingTop: Spacing[3],
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Palette.gray200,
  },
  meta: {
    fontSize: FontSize.xs,
    fontFamily: FontWeight.normal,
    opacity: 0.5,
  },
});
