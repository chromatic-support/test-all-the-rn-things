import type { Meta, StoryObj } from "@storybook/react-native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { useArgs } from "storybook/preview-api";

// shared components
import {
  ProgressBar,
  Skeleton,
  Spinner,
  type ProgressBarProps,
} from "@/components/ui/primatives/loaders";

const meta: Meta = {
  title: "Components/Primatives/Loaders",
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const SpinnerDefault: Story = {
  render: () => (
    <View style={{ padding: 16, alignItems: "center" }}>
      <Spinner />
    </View>
  ),
};

export const SpinnerSmall: Story = {
  render: () => (
    <View style={{ padding: 16, alignItems: "center" }}>
      <Spinner size="small" />
    </View>
  ),
};

export const SkeletonDefault: Story = {
  render: () => (
    <View style={{ padding: 16, gap: 8 }}>
      <Skeleton width={280} height={16} />
      <Skeleton width={200} height={16} />
      <Skeleton width={240} height={16} />
    </View>
  ),
};

export const SkeletonCard: Story = {
  render: () => (
    <View style={{ padding: 16, gap: 12 }}>
      <Skeleton width={320} height={160} borderRadius={12} />
      <Skeleton width={200} height={20} borderRadius={4} />
      <Skeleton width={280} height={14} borderRadius={4} />
      <Skeleton width={240} height={14} borderRadius={4} />
    </View>
  ),
};

/**
 * The Progress Bar uses Reanimated to create a smooth filling animation. This story allows you to adjust the progress value using Storybook's controls, demonstrating how the ProgressBar component visually represents different levels of progress. You can set the progress to any value between 0 and 1 to see how the bar fills accordingly.
 */
export const ProgressBarDefault: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ProgressBarProps>();
    const progress = args.progress ?? 0.4;
    return (
      <View style={{ padding: 16, gap: 12 }}>
        <ProgressBar progress={progress} />
      </View>
    );
  },
};

export const ProgressBarFull: Story = {
  render: () => (
    <View style={{ padding: 16 }}>
      <ProgressBar progress={1} />
    </View>
  ),
};

/**
 * This story demonstrates an animated progress bar that fills up over time. It uses the `useState` hook to manage the progress state and the `useEffect` hook to create a timer that updates the progress every 400 milliseconds until it reaches 100%. This allows us to visualize how the `ProgressBar` component behaves as it fills up.
 */
export const ProgressBarAnimated: Story = {
  render: function Render() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 1) {
            clearInterval(interval);
            return 1;
          }
          return p + 0.1;
        });
      }, 400);
      return () => clearInterval(interval);
    }, []);

    return (
      <View style={{ padding: 16 }}>
        <ProgressBar progress={progress} />
      </View>
    );
  },
};
