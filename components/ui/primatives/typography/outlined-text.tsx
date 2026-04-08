import React, { useState } from 'react';
import { StyleSheet, Text as RNText, View } from 'react-native';
import Svg, { Text as SvgText } from 'react-native-svg';

// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from '@/constants/theme';

export type OutlinedTextAnchor = 'start' | 'middle' | 'end';
export type OutlinedTextBoxFit = 'full' | 'text';

export type OutlinedTextProps = {
  children: string;
  fontSize?: number;
  fontFamily?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  textAnchor?: OutlinedTextAnchor;
  height?: number;
  boxColor?: string;
  boxOpacity?: number;
  boxFit?: OutlinedTextBoxFit;
};

const BOX_PADDING = Spacing[2];

export function OutlinedText({
  children,
  fontSize = FontSize.xl2,
  fontFamily = FontWeight.bold,
  fill = Palette.white,
  stroke = Palette.brand,
  strokeWidth = 1,
  textAnchor = 'middle',
  height,
  boxColor,
  boxOpacity = 1,
  boxFit = 'full',
}: OutlinedTextProps) {
  const [containerWidth, setContainerWidth] = useState(0);
  const [textWidth, setTextWidth] = useState(0);

  const halfStroke = strokeWidth / 2;
  const textY = fontSize + halfStroke;
  const svgHeight = height ?? fontSize * 1.5 + strokeWidth;

  const xPositions: Record<OutlinedTextAnchor, number> = {
    start: 0,
    middle: containerWidth / 2,
    end: containerWidth,
  };

  const fittedBoxWidth = textWidth + BOX_PADDING * 2;
  const fittedBoxLeft: Record<OutlinedTextAnchor, number> = {
    start: 0,
    middle: (containerWidth - fittedBoxWidth) / 2,
    end: containerWidth - fittedBoxWidth,
  };

  return (
    <View
      style={{ width: '100%' }}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      {boxColor && boxFit === 'text' && (
        <RNText
          style={[styles.hiddenMeasure, { fontSize, fontFamily }]}
          onLayout={(e) => setTextWidth(e.nativeEvent.layout.width)}
        >
          {children}
        </RNText>
      )}
      {containerWidth > 0 && (
        <View style={{ height: svgHeight }}>
          {boxColor && (boxFit === 'full' || textWidth > 0) && (
            <View
              style={[
                styles.box,
                { backgroundColor: boxColor, opacity: boxOpacity },
                boxFit === 'full'
                  ? { left: 0, right: 0 }
                  : { width: fittedBoxWidth, left: fittedBoxLeft[textAnchor] },
              ]}
            />
          )}
          <Svg width={containerWidth} height={svgHeight}>
            <SvgText
              x={xPositions[textAnchor]}
              y={textY}
              fontSize={fontSize}
              fontFamily={fontFamily}
              fill={fill}
              stroke={stroke}
              strokeWidth={strokeWidth}
              textAnchor={textAnchor}
            >
              {children}
            </SvgText>
          </Svg>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  hiddenMeasure: {
    position: 'absolute',
    opacity: 0,
  },
  box: {
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
});
