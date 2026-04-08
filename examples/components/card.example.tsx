import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { FontSize, FontWeight, LineHeight, Spacing } from '@/constants/theme'; // shared theme constants

type InfoCardProps = {
  title: string;
  body: string;
};

export function InfoCard({ title, body }: InfoCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing[4],
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
      },
      android: {
        elevation: 3,
      },
      default: {},
    }),
  },
  title: {
    fontSize: FontSize.lg,
    fontFamily: FontWeight.bold,
    marginBottom: Spacing[2],
  },
  body: {
    fontSize: FontSize.sm,
    lineHeight: LineHeight.normal * FontSize.sm,
  },
});
