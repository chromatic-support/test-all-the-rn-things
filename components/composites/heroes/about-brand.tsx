import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from "react-native";

// shared component
import { OutlinedText } from "@/components/ui/primatives/typography/outlined-text";
// shared theme constants
import { FontSize, Palette, Spacing } from "@/constants/theme";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const HERO_HEIGHT = SCREEN_HEIGHT * 0.35;

export type AboutBrandHeroProps = {
  tagline?: string;
};

export function AboutBrandHero({ tagline }: AboutBrandHeroProps) {
  return (
    <ImageBackground
      source={require("@/assets/img/marketing/three-cans.png")}
      style={styles.container}
      imageStyle={styles.image}
      resizeMode="cover"
    >
      <View style={styles.logoWrapper}>
        <Image
          source={require("@/assets/img/logo-vertical.png")}
          style={styles.logo}
          resizeMode="contain"
          accessibilityRole="image"
          accessibilityLabel="Brand logo"
        />
      </View>
      {tagline ? (
        <View style={styles.tagline}>
          <OutlinedText
            fontSize={FontSize.xl2}
            fill={Palette.brand}
            stroke={Palette.slate}
            strokeWidth={1}
            boxColor={Palette.black}
            boxOpacity={0.5}
            boxFit="full"
          >
            {tagline}
          </OutlinedText>
        </View>
      ) : null}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: HERO_HEIGHT,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: Spacing[3],
    paddingVertical: Spacing[4],
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.5,
  },
  tagline: {
    width: "100%",
  },
  logoWrapper: {
    position: "absolute",
    top: HERO_HEIGHT * (2 / 3) - 48,
    left: 0,
    right: 0,
    backgroundColor: `${Palette.black}99`,
    alignItems: "center",
    paddingVertical: Spacing[2],
  },
  logo: {
    width: "100%",
    height: 80,
  },
});
