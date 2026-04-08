import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

// shared component
import { Heading } from '@/components/ui/primatives/typography/heading';
// shared component
import { Spacer } from '@/components/ui/layout/spacer';
// shared component
import { Grid } from '@/components/ui/layout/grid';
// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from '@/constants/theme';
// shared hook
import { useThemeColor } from '@/hooks/use-theme-color';

const AVATAR_SIZE = 64;

export type TeamMember = {
  name: string;
  role: string;
  imageSource: number;
};

export type TeamSectionProps = {
  members: TeamMember[];
};

export function TeamSection({ members }: TeamSectionProps) {
  const textColor = useThemeColor({}, 'text');

  return (
    <View>
      <View style={styles.headingRow}>
        <Heading level={2}>Meet the Team</Heading>
      </View>
      <Spacer size={4} />
      <Grid columns={4} gap={3}>
        {members.map((member) => (
          <View key={member.name} style={styles.memberCell}>
            <Image
              source={member.imageSource}
              style={styles.avatar}
              accessibilityRole="image"
              accessibilityLabel={member.name}
            />
            <Text style={[styles.name, { color: textColor }]} numberOfLines={1}>
              {member.name}
            </Text>
            <Text style={[styles.role, { color: textColor }]} numberOfLines={1}>
              {member.role}
            </Text>
          </View>
        ))}
      </Grid>
    </View>
  );
}

const styles = StyleSheet.create({
  memberCell: {
    alignItems: 'center',
    gap: Spacing[1],
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: Palette.gray200,
  },
  name: {
    fontSize: FontSize.xs,
    fontFamily: FontWeight.semibold,
    textAlign: 'center',
  },
  role: {
    fontSize: FontSize.xs,
    fontFamily: FontWeight.normal,
    textAlign: 'center',
    opacity: 0.6,
  },
  headingRow: {
    alignItems: 'center',
  },
});
