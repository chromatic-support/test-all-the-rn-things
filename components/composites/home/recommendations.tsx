import React from "react";
import {
    FlatList,
    Image,
    ImageSourcePropType,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

// shared component
import { Tag } from "@/components/ui/primatives/tag";
// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from "@/constants/theme";
// shared hook
import { useThemeColor } from "@/hooks/use-theme-color";

const CARD_WIDTH = 130;
const IMAGE_HEIGHT = 100;

export type RecommendationItem = {
  id: string;
  name: string;
  image: ImageSourcePropType;
  tag?: string;
  onPress: () => void;
};

export type HomeRecommendationsProps = {
  items: RecommendationItem[];
};

export function HomeRecommendations({ items }: HomeRecommendationsProps) {
  const textColor = useThemeColor({}, "text");
  const cardBg = useThemeColor(
    { light: Palette.gray100, dark: Palette.gray800 },
    "background",
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.heading, { color: textColor }]}>
        Recommended for you...
      </Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            onPress={item.onPress}
            accessibilityRole="button"
            accessibilityLabel={item.name}
            style={({ pressed }) => [
              styles.card,
              { backgroundColor: cardBg },
              pressed ? styles.pressed : null,
            ]}
          >
            <Image
              source={item.image}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.info}>
              <Text
                style={[styles.name, { color: textColor }]}
                numberOfLines={2}
              >
                {item.name}
              </Text>
              {item.tag != null ? <Tag label={item.tag} /> : null}
            </View>
          </Pressable>
        )}
      />
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
  list: {
    gap: Spacing[3],
  },
  card: {
    width: CARD_WIDTH,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: CARD_WIDTH,
    height: IMAGE_HEIGHT,
  },
  info: {
    padding: Spacing[2],
    gap: Spacing[1],
  },
  name: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.medium,
  },
  pressed: {
    opacity: 0.85,
  },
});
