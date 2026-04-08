import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { FontSize, FontWeight, Spacing } from '@/constants/theme'; // shared theme constants

type Item = {
  id: string;
  title: string;
  subtitle: string;
};

const DATA: Item[] = [
  { id: '1', title: 'Alpha', subtitle: 'First item' },
  { id: '2', title: 'Beta', subtitle: 'Second item' },
  { id: '3', title: 'Gamma', subtitle: 'Third item' },
];

export function ItemList() {
  return (
    <FlatList
      data={DATA}
      keyExtractor={(item) => item.id}
      initialNumToRender={8}
      contentContainerStyle={styles.content}
      renderItem={({ item }) => (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={item.title}
          style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
        >
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    padding: Spacing[4],
  },
  row: {
    padding: Spacing[4],
    borderRadius: 12,
    marginBottom: Spacing[3],
  },
  rowPressed: {
    opacity: 0.85,
  },
  title: {
    fontSize: FontSize.base,
    fontFamily: FontWeight.semibold,
  },
  subtitle: {
    fontSize: FontSize.sm,
    marginTop: Spacing[1],
  },
});
