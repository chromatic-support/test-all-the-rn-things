import type { Meta, StoryObj } from "@storybook/react-native";

// shared component
import { TeamSection } from "@/components/composites/about/team";
// mock data
import mockTeamMembers from "@/data/mocks/team";

const meta: Meta<typeof TeamSection> = {
  title: "Composites/About/Team",
  component: TeamSection,
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {
  args: { members: mockTeamMembers },
};

export const SingleRow: Story = {
  args: { members: mockTeamMembers.slice(0, 4) },
};

export const Empty: Story = {
  args: { members: [] },
};
