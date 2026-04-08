import React from "react";
import { StyleSheet, Text, View } from "react-native";

// shared component
import { Heading } from "@/components/ui/primatives/typography/heading";
// shared component
import { Spacer } from "@/components/ui/layout/spacer";
// shared theme constants
import {
    FontSize,
    FontWeight,
    LineHeight,
    Palette,
    Spacing,
} from "@/constants/theme";
// shared hook
import { useThemeColor } from "@/hooks/use-theme-color";

export type MissionValuesProps = {
  summary?: string;
  values?: string[];
};

const DEFAULT_SUMMARY =
  "Our mission is simple: make every sip worth it. We believe in sourcing real ingredients, treating people fairly, and never cutting corners — whether that means longer brew times, smaller batches, or saying no to shortcuts that compromise the experience. Taste is our north star, and doing right by people is how we get there.";

const DEFAULT_VALUES = [
  "Real ingredients, always",
  "Bold flavors over safe ones",
  "People before profit",
  "Small batches, big care",
  "Adventure in every can",
];

export function MissionValues({
  summary = DEFAULT_SUMMARY,
  values = DEFAULT_VALUES,
}: MissionValuesProps) {
  const textColor = useThemeColor({}, "text");

  return (
    <View>
      <View style={styles.headingRow}>
        <Heading level={2}>Our Mission</Heading>
      </View>
      <Spacer size={3} />
      <Text style={[styles.summary, { color: textColor }]}>{summary}</Text>
      {values.length > 0 ? (
        <>
          <Spacer size={4} />
          <View style={styles.headingRow}>
            <Heading level={3}>At Monstera, We Value...</Heading>
          </View>
          <Spacer size={3} />
          <View style={styles.valuesList}>
            {values.map((value) => (
              <View key={value} style={styles.valueRow}>
                <View style={styles.bullet} />
                <Text style={[styles.valueText, { color: textColor }]}>
                  {value}
                </Text>
              </View>
            ))}
          </View>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  headingRow: {
    alignItems: "center",
  },
  summary: {
    fontSize: FontSize.base,
    fontFamily: FontWeight.normal,
    lineHeight: FontSize.base * LineHeight.relaxed,
    textAlign: "center",
  },
  valuesList: {
    gap: Spacing[3],
    paddingHorizontal: Spacing[12],
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing[3],
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Palette.brand,
    flexShrink: 0,
  },
  valueText: {
    fontSize: FontSize.base,
    fontFamily: FontWeight.medium,
    lineHeight: FontSize.base * LineHeight.normal,
  },
});
