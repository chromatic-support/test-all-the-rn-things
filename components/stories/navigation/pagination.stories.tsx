import { useState } from 'react';
import { Text, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';

// shared component
import { Pagination } from '@/components/ui/navigation/pagination';
// shared theme constants
import { FontSize, FontWeight, Palette } from '@/constants/theme';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Navigation/Pagination',
  component: Pagination,
  args: {
    page: 1,
    totalPages: 10,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {
  render: function Render(args) {
    const [page, setPage] = useState(args.page);
    return <Pagination {...args} page={page} onPageChange={setPage} />;
  },
};

export const FirstPage: Story = {
  args: { page: 1, totalPages: 10 },
  render: function Render(args) {
    const [page, setPage] = useState(args.page);
    return <Pagination {...args} page={page} onPageChange={setPage} />;
  },
};

export const MiddlePage: Story = {
  args: { page: 5, totalPages: 10 },
  render: function Render(args) {
    const [page, setPage] = useState(args.page);
    return <Pagination {...args} page={page} onPageChange={setPage} />;
  },
};

export const LastPage: Story = {
  args: { page: 10, totalPages: 10 },
  render: function Render(args) {
    const [page, setPage] = useState(args.page);
    return <Pagination {...args} page={page} onPageChange={setPage} />;
  },
};

export const FewPages: Story = {
  args: { page: 1, totalPages: 3 },
  render: function Render(args) {
    const [page, setPage] = useState(args.page);
    return <Pagination {...args} page={page} onPageChange={setPage} />;
  },
};

export const WithPageIndicator: Story = {
  args: { page: 5, totalPages: 10 },
  render: function Render(args) {
    const [page, setPage] = useState(args.page);
    return (
      <View style={{ alignItems: 'center', gap: 8 }}>
        <Pagination {...args} page={page} onPageChange={setPage} />
        <Text style={{ fontSize: FontSize.sm, fontFamily: FontWeight.normal, color: Palette.gray500 }}>
          Page {page} of {args.totalPages}
        </Text>
      </View>
    );
  },
};
