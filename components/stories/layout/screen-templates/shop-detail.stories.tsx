import { Dimensions, StyleSheet, Text, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { ShopDetailScreen } from '@/components/ui/layout/screen-templates/shop-detail';
// shared theme constants
import { FontSize, FontWeight, Palette } from '@/constants/theme';

const IMAGE_HEIGHT = Dimensions.get('window').height * 0.4;

const meta: Meta<typeof ShopDetailScreen> = {
  title: 'Components/Layout/Screen Templates/ShopDetail',
  component: ShopDetailScreen,
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {
  render: () => (
    <ShopDetailScreen
      image={
        <View style={[styles.image, { height: IMAGE_HEIGHT }]}>
          <Text style={styles.label}>product image</Text>
        </View>
      }
      info={
        <View style={styles.info}>
          <Text style={styles.label}>product info</Text>
        </View>
      }
      options={
        <View style={styles.options}>
          <Text style={styles.label}>options / variants</Text>
        </View>
      }
      reviews={
        <View style={styles.actions}>
          <Text style={styles.label}>reviews</Text>
        </View>
      }
      addToCart={
        <View style={styles.actions}>
          <Text style={styles.label}>add to cart</Text>
        </View>
      }
    />
  ),
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    backgroundColor: `${Palette.brand}28`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    minHeight: 160,
    backgroundColor: `${Palette.brand}18`,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  options: {
    minHeight: 120,
    backgroundColor: `${Palette.brand}18`,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  actions: {
    height: 80,
    backgroundColor: `${Palette.brand}18`,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  label: {
    fontSize: FontSize.lg,
    fontFamily: FontWeight.medium,
    color: Palette.gray500,
  },
});
