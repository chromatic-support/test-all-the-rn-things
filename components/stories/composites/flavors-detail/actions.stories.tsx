import { View, StyleSheet } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { useArgs } from 'storybook/preview-api';

// shared component
import { FlavorActions } from '@/components/composites/flavors-detail/actions';
// shared theme constants
import { Spacing } from '@/constants/theme';

const meta: Meta<typeof FlavorActions> = {
  title: 'Composites/FlavorsDetail/Actions',
  component: FlavorActions,
  args: {
    isFavorited: false,
    onShare: () => {},
    onInShop: () => {},
  },
  render: function Render(args) {
    const [{ isFavorited }, updateArgs] = useArgs<typeof args>();
    return (
      <View style={styles.wrapper}>
        <FlavorActions
          {...args}
          isFavorited={isFavorited}
          onFavorite={() => updateArgs({ isFavorited: !isFavorited })}
        />
      </View>
    );
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {};

export const Favorited: Story = {
  args: { isFavorited: true },
};

const styles = StyleSheet.create({
  wrapper: {
    padding: Spacing[4],
  },
});
