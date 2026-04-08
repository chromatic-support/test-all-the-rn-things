/**
 * Theme constants derived from the design system documented in colors.mdx and theme.mdx.
 * Colors are organized by palette group with light/dark variants.
 * Font family: Hind (primary) with system fallbacks.
 */

import { Platform } from 'react-native';

// ---------------------------------------------------------------------------
// Base colors
// ---------------------------------------------------------------------------

export const Palette = {
  // Base
  peach: '#F89980',
  peachLight: '#FFBAA8',
  peachDark: '#E67858',

  mint: '#B6FBAB',
  mintLight: '#D4FDC9',
  mintDark: '#98E883',

  lilac: '#E2ABFB',
  lilacLight: '#F0C9FD',
  lilacDark: '#D089E8',

  sky: '#ABD9FB',
  skyLight: '#C9E8FD',
  skyDark: '#89C0E8',

  lemon: '#FDFAAB',
  lemonLight: '#FFFDC9',
  lemonDark: '#EBE789',

  coral: '#FB9DAB',
  coralLight: '#FFBBC9',
  coralDark: '#E87B89',

  // Extended
  aqua: '#ABF5FB',
  aquaLight: '#C9F9FD',
  aquaDark: '#89E2E8',

  rose: '#FBABCA',
  roseLight: '#FFC9E8',
  roseDark: '#E889B2',

  lavender: '#D4ABFB',
  lavenderLight: '#E8C9FD',
  lavenderDark: '#BC89E8',

  butter: '#FBE9AB',
  butterLight: '#FFF4C9',
  butterDark: '#E8D689',

  sage: '#C3FBAB',
  sageLight: '#DDFDC9',
  sageDark: '#ABE889',

  // Neutrals
  white: '#ffffff',
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',
  slate: '#0f172a',
  black: '#000000',

  // Brand (peach palette)
  brand: '#F89980',
  brandLight: '#FFBAA8',
  brandDark: '#E67858',
} as const;

// ---------------------------------------------------------------------------
// Semantic colors (light / dark modes)
// ---------------------------------------------------------------------------

export const Colors = {
  light: {
    text: Palette.gray900,
    background: Palette.white,
    tint: Palette.brand,
    icon: Palette.gray500,
    tabIconDefault: Palette.gray500,
    tabIconSelected: Palette.brand,
  },
  dark: {
    text: Palette.gray100,
    background: Palette.slate,
    tint: Palette.brandLight,
    icon: Palette.gray400,
    tabIconDefault: Palette.gray400,
    tabIconSelected: Palette.brandLight,
  },
} as const;

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------

export const FontFamily = {
  hindLight: 'Hind_300Light',
  hindRegular: 'Hind_400Regular',
  hindMedium: 'Hind_500Medium',
  hindSemiBold: 'Hind_600SemiBold',
  hindBold: 'Hind_700Bold',
} as const;

export const Fonts = Platform.select({
  ios: {
    sans: FontFamily.hindRegular,
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: FontFamily.hindRegular,
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "Hind, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

// Heading scale: fontSize (px) + fontFamily (encodes weight) + lineHeight (px, ratio 1.4)
export const Headings = {
  h1: { fontSize: 40, fontFamily: FontFamily.hindBold,     lineHeight: 56 },
  h2: { fontSize: 32, fontFamily: FontFamily.hindBold,     lineHeight: 45 },
  h3: { fontSize: 28, fontFamily: FontFamily.hindSemiBold, lineHeight: 39 },
  h4: { fontSize: 24, fontFamily: FontFamily.hindSemiBold, lineHeight: 34 },
  h5: { fontSize: 20, fontFamily: FontFamily.hindSemiBold, lineHeight: 28 },
  h6: { fontSize: 16, fontFamily: FontFamily.hindSemiBold, lineHeight: 22 },
} as const;

// Font size scale (px)
export const FontSize = {
  xs:   12,
  sm:   14,
  base: 16,
  lg:   18,
  xl:   20,
  xl2:  24,
  xl3:  30,
  xl4:  36,
  xl5:  48,
  xl6:  60,
} as const;

// Font weight → Hind font family name (weight is encoded in the loaded font name)
export const FontWeight = {
  light:    FontFamily.hindLight,
  normal:   FontFamily.hindRegular,
  medium:   FontFamily.hindMedium,
  semibold: FontFamily.hindSemiBold,
  bold:     FontFamily.hindBold,
} as const;

// Line height multipliers — multiply by fontSize to get an absolute lineHeight (px)
// e.g. lineHeight: LineHeight.normal * FontSize.base → 24
export const LineHeight = {
  none:    1,
  tight:   1.25,
  snug:    1.375,
  normal:  1.5,
  relaxed: 1.625,
  loose:   2,
} as const;

// Letter spacing multipliers — multiply by fontSize to get absolute letterSpacing (pt)
// e.g. letterSpacing: LetterSpacing.wide * FontSize.base → 0.4
export const LetterSpacing = {
  tighter: -0.05,
  tight:   -0.025,
  normal:   0,
  wide:     0.025,
  wider:    0.05,
  widest:   0.1,
} as const;

// Text alignment values (React Native textAlign)
export const TextAlign = {
  left:    'left',
  center:  'center',
  right:   'right',
  justify: 'justify',
} as const;

// Text transform values (React Native textTransform)
export const TextTransform = {
  uppercase:  'uppercase',
  lowercase:  'lowercase',
  capitalize: 'capitalize',
  none:       'none',
} as const;

// Text decoration values (React Native textDecorationLine)
export const TextDecoration = {
  underline:    'underline',
  lineThrough:  'line-through',
  none:         'none',
} as const;

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------

// Gap / spacing scale (px) — used with gap, rowGap, columnGap, margin, padding
export const Spacing = {
  0:  0,
  1:  4,
  2:  8,
  3:  12,
  4:  16,
  5:  20,
  6:  24,
  8:  32,
  10: 40,
  12: 48,
} as const;
