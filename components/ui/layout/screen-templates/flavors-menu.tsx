import React from "react";
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

// shared component
import { Container } from "@/components/ui/layout/container";
// shared component
import { Spacer } from "@/components/ui/layout/spacer";
// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from "@/constants/theme";

export type FlavorItem = {
  label: string;
  image?: number;
  backgroundColor?: string;
  onPress?: () => void;
};

type Props = {
  hero?: React.ReactNode;
  items?: FlavorItem[];
};

export function FlavorsMenuScreen({ hero, items }: Props) {
  return (
    <ScrollView>
      <Container size="full" padded={false}>
        {hero}
      </Container>
      <Spacer color={Palette.brand} />
      <View style={styles.listBackground}>
        <Container padded>
          <View style={styles.list}>
            {items?.map((item, index) => (
              <Pressable
                key={index}
                onPress={item.onPress}
                accessibilityRole="button"
                accessibilityLabel={item.label}
                style={({ pressed }) => (pressed ? styles.pressed : undefined)}
              >
                {item.image != null ? (
                  <ImageBackground
                    source={item.image}
                    style={[
                      styles.listItem,
                      {
                        backgroundColor:
                          item.backgroundColor ?? Palette.gray100,
                      },
                    ]}
                    imageStyle={styles.listItemImage}
                    resizeMode="cover"
                  >
                    <Text style={styles.listLabel}>{item.label}</Text>
                  </ImageBackground>
                ) : (
                  <View
                    style={[
                      styles.listItem,
                      {
                        backgroundColor:
                          item.backgroundColor ?? Palette.gray100,
                      },
                    ]}
                  >
                    <Text style={styles.listLabel}>{item.label}</Text>
                  </View>
                )}
              </Pressable>
            ))}
          </View>
        </Container>
      </View>
      <Spacer color={Palette.brand} size={6} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: Spacing[2],
  },
  listItem: {
    height: 80,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  listItemImage: {
    opacity: 0.25,
  },
  listLabel: {
    fontSize: FontSize.xl,
    fontFamily: FontWeight.semibold,
    color: Palette.gray900,
    textAlign: "center",
  },
  listBackground: {
    backgroundColor: Palette.brand,
  },
  pressed: {
    opacity: 0.8,
  },
});
