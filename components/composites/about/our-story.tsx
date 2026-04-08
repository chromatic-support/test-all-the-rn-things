import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// shared component
import { Heading } from '@/components/ui/primatives/typography/heading';
// shared component
import { Spacer } from '@/components/ui/layout/spacer';
// shared theme constants
import { FontSize, FontWeight, LineHeight } from '@/constants/theme';
// shared hook
import { useThemeColor } from '@/hooks/use-theme-color';

export type OurStoryProps = {
  summary?: string;
};

const DEFAULT_SUMMARY =
  'We started in a tiny kitchen with one wild idea: drinks that actually taste like something. No filler flavors, no mystery ingredients — just bold, unexpected combinations inspired by the places, people, and moments we love. Every can is a small adventure, crafted for those who believe the best things in life are a little out of the ordinary.';

export function OurStory({ summary = DEFAULT_SUMMARY }: OurStoryProps) {
  const textColor = useThemeColor({}, 'text');

  return (
    <View>
      <View style={styles.headingRow}>
        <Heading level={2}>Our Story</Heading>
      </View>
      <Spacer size={3} />
      <Text style={[styles.summary, { color: textColor }]}>{summary}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headingRow: {
    alignItems: 'center',
  },
  summary: {
    fontSize: FontSize.base,
    fontFamily: FontWeight.normal,
    lineHeight: FontSize.base * LineHeight.relaxed,
    textAlign: 'center',
  },
});
