import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from '@/constants/theme';
// shared hook
import { useThemeColor } from '@/hooks/use-theme-color';

export type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function buildPageWindow(page: number, totalPages: number): (number | '...')[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | '...')[] = [1];

  if (page > 3) {
    pages.push('...');
  }

  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (page < totalPages - 2) {
    pages.push('...');
  }

  pages.push(totalPages);

  return pages;
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  const textColor = useThemeColor({}, 'text');
  const isPrevDisabled = page <= 1;
  const isNextDisabled = page >= totalPages;
  const pageWindow = buildPageWindow(page, totalPages);

  return (
    <View style={styles.container} accessibilityRole="none" accessibilityLabel="Pagination">
      <Pressable
        onPress={() => onPageChange(page - 1)}
        disabled={isPrevDisabled}
        accessibilityRole="button"
        accessibilityLabel="Previous page"
        accessibilityState={{ disabled: isPrevDisabled }}
        style={({ pressed }) => [
          styles.control,
          isPrevDisabled && styles.disabled,
          pressed && !isPrevDisabled && styles.pressed,
        ]}
      >
        <Text style={[styles.chevron, { color: isPrevDisabled ? Palette.gray300 : Palette.brand }]}>
          ‹
        </Text>
      </Pressable>

      {pageWindow.map((item, index) =>
        item === '...' ? (
          <Text key={`ellipsis-${index}`} style={[styles.ellipsis, { color: textColor }]}>
            …
          </Text>
        ) : (
          <Pressable
            key={item}
            onPress={() => onPageChange(item)}
            accessibilityRole="button"
            accessibilityLabel={`Page ${item}`}
            accessibilityState={{ selected: item === page }}
            style={({ pressed }) => [
              styles.pageButton,
              item === page && styles.pageButtonActive,
              pressed && item !== page && styles.pressed,
            ]}
          >
            <Text
              style={[
                styles.pageLabel,
                { color: item === page ? Palette.white : textColor },
              ]}
            >
              {item}
            </Text>
          </Pressable>
        )
      )}

      <Pressable
        onPress={() => onPageChange(page + 1)}
        disabled={isNextDisabled}
        accessibilityRole="button"
        accessibilityLabel="Next page"
        accessibilityState={{ disabled: isNextDisabled }}
        style={({ pressed }) => [
          styles.control,
          isNextDisabled && styles.disabled,
          pressed && !isNextDisabled && styles.pressed,
        ]}
      >
        <Text style={[styles.chevron, { color: isNextDisabled ? Palette.gray300 : Palette.brand }]}>
          ›
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing[1],
    paddingVertical: Spacing[2],
  },
  control: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  chevron: {
    fontSize: FontSize.xl2,
    fontFamily: FontWeight.light,
    height: 36,
    lineHeight: 36,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  pageButton: {
    minWidth: 36,
    height: 36,
    paddingHorizontal: Spacing[2],
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  pageButtonActive: {
    backgroundColor: Palette.brand,
  },
  pageLabel: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.medium,
  },
  ellipsis: {
    fontSize: FontSize.sm,
    paddingHorizontal: Spacing[1],
  },
  disabled: {
    opacity: 0.4,
  },
  pressed: {
    opacity: 0.6,
  },
});
