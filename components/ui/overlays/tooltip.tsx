import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from '@/constants/theme';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export type TooltipProps = {
  content: string;
  visible: boolean;
  placement?: TooltipPlacement;
  children: React.ReactNode;
};

export function Tooltip({
  content,
  visible,
  placement = 'top',
  children,
}: TooltipProps) {
  const isHorizontal = placement === 'left' || placement === 'right';

  const bubble = visible ? (
    <TooltipBubble content={content} placement={placement} />
  ) : null;

  if (isHorizontal) {
    return (
      <View style={styles.wrapperRow}>
        {placement === 'left' ? bubble : null}
        <View>{children}</View>
        {placement === 'right' ? bubble : null}
      </View>
    );
  }

  return (
    <View style={styles.wrapperColumn}>
      {placement === 'top' ? bubble : null}
      <View>{children}</View>
      {placement === 'bottom' ? bubble : null}
    </View>
  );
}

type TooltipBubbleProps = {
  content: string;
  placement: TooltipPlacement;
};

function TooltipBubble({ content, placement }: TooltipBubbleProps) {
  const arrowStyle = ARROW_STYLES[placement];

  return (
    <View
      style={[
        styles.bubbleWrapper,
        placement === 'top' || placement === 'bottom'
          ? styles.bubbleWrapperColumn
          : styles.bubbleWrapperRow,
        placement === 'top' ? styles.bubbleWrapperTop : null,
        placement === 'bottom' ? styles.bubbleWrapperBottom : null,
        placement === 'left' ? styles.bubbleWrapperLeft : null,
        placement === 'right' ? styles.bubbleWrapperRight : null,
      ]}
    >
      {placement === 'bottom' || placement === 'right' ? (
        <View style={arrowStyle} />
      ) : null}
      <View style={styles.bubble}>
        <Text style={styles.bubbleText} numberOfLines={3}>
          {content}
        </Text>
      </View>
      {placement === 'top' || placement === 'left' ? (
        <View style={arrowStyle} />
      ) : null}
    </View>
  );
}

const TOOLTIP_BG = Palette.gray800;

const ARROW_STYLES = {
  // tooltip is above anchor → arrow points down
  top: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: TOOLTIP_BG,
    alignSelf: 'center' as const,
  },
  // tooltip is below anchor → arrow points up
  bottom: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: TOOLTIP_BG,
    alignSelf: 'center' as const,
  },
  // tooltip is to the left → arrow points right
  left: {
    width: 0,
    height: 0,
    borderTopWidth: 6,
    borderBottomWidth: 6,
    borderLeftWidth: 6,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: TOOLTIP_BG,
    alignSelf: 'center' as const,
  },
  // tooltip is to the right → arrow points left
  right: {
    width: 0,
    height: 0,
    borderTopWidth: 6,
    borderBottomWidth: 6,
    borderRightWidth: 6,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: TOOLTIP_BG,
    alignSelf: 'center' as const,
  },
};

const styles = StyleSheet.create({
  wrapperColumn: {
    alignItems: 'center',
  },
  wrapperRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bubbleWrapper: {
    alignItems: 'center',
  },
  bubbleWrapperColumn: {
    flexDirection: 'column',
  },
  bubbleWrapperRow: {
    flexDirection: 'row',
  },
  bubbleWrapperTop: {
    marginBottom: Spacing[1],
  },
  bubbleWrapperBottom: {
    marginTop: Spacing[1],
  },
  bubbleWrapperLeft: {
    marginRight: Spacing[1],
  },
  bubbleWrapperRight: {
    marginLeft: Spacing[1],
  },
  bubble: {
    backgroundColor: TOOLTIP_BG,
    borderRadius: 6,
    paddingHorizontal: Spacing[3],
    paddingVertical: Spacing[2],
    maxWidth: 200,
  },
  bubbleText: {
    fontSize: FontSize.xs,
    fontFamily: FontWeight.normal,
    color: Palette.white,
    lineHeight: FontSize.xs * 1.5,
  },
});
