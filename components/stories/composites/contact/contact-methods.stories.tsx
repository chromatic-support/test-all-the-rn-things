import { View, StyleSheet } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { useArgs } from 'storybook/preview-api';

// shared component
import { ContactMethods } from '@/components/composites/contact/contact-methods';
import type { ContactMethodType } from '@/components/composites/contact/contact-methods';
// shared theme constants
import { Spacing } from '@/constants/theme';

const meta: Meta<typeof ContactMethods> = {
  title: 'Composites/Contact/ContactMethods',
  component: ContactMethods,
  args: {
    method: 'email',
  },
  render: function Render(args) {
    const [{ method }, updateArgs] = useArgs<typeof args>();
    return (
      <View style={styles.wrapper}>
        <ContactMethods
          {...args}
          method={method}
          onMethodChange={(m: ContactMethodType) => updateArgs({ method: m })}
        />
      </View>
    );
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const EmailSelected: Story = {
  args: { method: 'email' },
};

export const PhoneSelected: Story = {
  args: { method: 'phone' },
};

const styles = StyleSheet.create({
  wrapper: {
    padding: Spacing[4],
  },
});
