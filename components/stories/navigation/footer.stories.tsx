import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { Footer, type FooterLink } from '@/components/ui/navigation/footer';

export function DefaultFooterComponent() {
  return (
    <Footer
      links={[
        { label: 'Privacy', onPress: () => {} },
        { label: 'Terms', onPress: () => {} },
        { label: 'Contact', onPress: () => {} },
      ]}
      copyright="© 2026 Acme Inc."
    />
  );
}

const meta: Meta<typeof Footer> = {
  title: 'Components/Navigation/Footer',
  component: Footer,
  args: {
    links: [
      { label: 'Privacy' },
      { label: 'Terms' },
      { label: 'Contact' },
    ],
    copyright: '© 2026 Acme Inc.',
  },
  render: function Render(args) {
    const linksWithHandlers = (args.links ?? []).map((link: FooterLink) => ({
      ...link,
      onPress: () => {},
    }));
    return <Footer {...args} links={linksWithHandlers} />;
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {};

export const LinksOnly: Story = {
  args: { copyright: undefined },
};

export const CopyrightOnly: Story = {
  args: { links: [] },
};

export const NoContent: Story = {
  args: { links: [], copyright: undefined },
};
