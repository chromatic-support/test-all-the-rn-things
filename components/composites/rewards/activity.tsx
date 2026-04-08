import React from "react";
import { StyleSheet, Text, View } from "react-native";

// shared component
import { Divider } from "@/components/ui/layout/divider";
// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from "@/constants/theme";
// shared hook
import { useThemeColor } from "@/hooks/use-theme-color";

export type RewardActivityEntry = {
  type: "earned" | "redeemed";
  points: number;
  description: string;
  date: string;
};

export type RewardsActivityProps = {
  history: RewardActivityEntry[];
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function RewardsActivity({ history }: RewardsActivityProps) {
  const textColor = useThemeColor({}, "text");
  const subtleColor = useThemeColor(
    { light: Palette.gray500, dark: Palette.gray400 },
    "icon",
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.heading, { color: textColor }]}>Activity</Text>
      {history.length === 0 ? (
        <Text style={[styles.empty, { color: subtleColor }]}>
          No activity yet.
        </Text>
      ) : (
        <View>
          {history.map((entry, index) => (
            <View key={index}>
              <View style={styles.row}>
                <View style={styles.info}>
                  <Text style={[styles.description, { color: textColor }]}>
                    {entry.description}
                  </Text>
                  <Text style={[styles.date, { color: subtleColor }]}>
                    {formatDate(entry.date)}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.points,
                    {
                      color:
                        entry.type === "earned"
                          ? Palette.brandDark
                          : subtleColor,
                    },
                  ]}
                >
                  {entry.points > 0 ? "+" : ""}
                  {entry.points.toLocaleString()} pts
                </Text>
              </View>
              {index < history.length - 1 ? <Divider /> : null}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing[3],
  },
  heading: {
    fontSize: FontSize.base,
    fontFamily: FontWeight.semibold,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Spacing[3],
    gap: Spacing[4],
  },
  info: {
    flex: 1,
    gap: Spacing[1],
  },
  description: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.medium,
  },
  date: {
    fontSize: FontSize.xs,
    fontFamily: FontWeight.normal,
  },
  points: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.semibold,
  },
  empty: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.normal,
  },
});
