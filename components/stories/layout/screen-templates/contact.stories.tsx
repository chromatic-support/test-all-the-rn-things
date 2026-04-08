import { StyleSheet, Text, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { ContactScreen } from '@/components/ui/layout/screen-templates/contact';
// shared theme constants
import { FontSize, FontWeight, Palette } from '@/constants/theme';

const meta: Meta<typeof ContactScreen> = {
  title: 'Components/Layout/Screen Templates/Contact',
  component: ContactScreen,
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {
  render: () => (
    <ContactScreen
      hero={
        <View style={styles.hero}>
          <Text style={styles.label}>contact hero</Text>
        </View>
      }
      contactMethods={
        <View style={styles.methods}>
          <Text style={styles.label}>contact methods</Text>
        </View>
      }
      contactForm={
        <View style={styles.form}>
          <Text style={styles.label}>contact form</Text>
        </View>
      }
    />
  ),
};

const styles = StyleSheet.create({
  hero: {
    width: '100%',
    height: 120,
    backgroundColor: `${Palette.brand}28`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  methods: {
    height: 100,
    backgroundColor: `${Palette.brand}18`,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  form: {
    minHeight: 300,
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
