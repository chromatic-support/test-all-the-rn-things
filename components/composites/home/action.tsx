import React from "react";
import {
    ImageBackground,
    ImageSourcePropType,
    StyleSheet,
    Text,
    View,
} from "react-native";

// shared component
import { Button } from "@/components/ui/primatives/button";
// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from "@/constants/theme";
// shared hook
import { useThemeColor } from "@/hooks/use-theme-color";
const FIRST_PURCHASE_IMAGE = require("@/assets/img/marketing/peru-passion-group.jpg");

type SaleProps = {
  variant: "sale";
  itemName: string;
  discountPercent: number;
  image: ImageSourcePropType;
  onPress: () => void;
};

type ReorderProps = {
  variant: "reorder";
  itemName: string;
  image: ImageSourcePropType;
  onPress: () => void;
};

type FirstPurchaseProps = {
  variant: "first-purchase";
  onPress: () => void;
};

export type HomeActionProps = SaleProps | ReorderProps | FirstPurchaseProps;

export function HomeAction(props: HomeActionProps) {
  const textColor = useThemeColor({}, "text");
  const subtleColor = useThemeColor(
    { light: Palette.gray500, dark: Palette.gray400 },
    "icon",
  );
  const cardBg = useThemeColor(
    { light: Palette.gray100, dark: Palette.gray800 },
    "background",
  );

  let imageSource: ImageSourcePropType = FIRST_PURCHASE_IMAGE;
  let eyebrow = "";
  let headline = "";
  let ctaLabel = "";

  if (props.variant === "sale") {
    imageSource = props.image;
    eyebrow = `On sale · ${props.discountPercent}% off`;
    headline = props.itemName;
    ctaLabel = "Buy again";
  } else if (props.variant === "reorder") {
    imageSource = props.image;
    eyebrow = "Reach for a favorite go-to";
    headline = props.itemName;
    ctaLabel = "Order again";
  } else {
    eyebrow = "New here?";
    headline = "Get free shipping & 20% off your first order";
    ctaLabel = "Shop now";
  }

  return (
    <View style={[styles.container, { backgroundColor: cardBg }]}>
      <ImageBackground
        source={imageSource}
        style={styles.imageSection}
        resizeMode="cover"
        accessibilityElementsHidden
        importantForAccessibility="no"
      />
      <View style={styles.contentSection}>
        <Text style={[styles.eyebrow, { color: subtleColor }]}>{eyebrow}</Text>
        <Text style={[styles.headline, { color: textColor }]}>{headline}</Text>
        <Button label={ctaLabel} onPress={props.onPress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 12,
    overflow: "hidden",
  },
  imageSection: {
    flex: 1,
  },
  contentSection: {
    flex: 2,
    padding: Spacing[4],
    gap: Spacing[2],
    justifyContent: "center",
  },
  eyebrow: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.medium,
  },
  headline: {
    fontSize: FontSize.lg,
    fontFamily: FontWeight.bold,
    lineHeight: FontSize.lg * 1.3,
  },
});
