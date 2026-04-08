import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// shared theme constants
import { Palette } from '@/constants/theme';
// shared hook
import { useThemeColor } from '@/hooks/use-theme-color';

export type AppShellProps = {
  children: React.ReactNode;
  nav?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
};

export function AppShell({ children, nav, header, footer }: AppShellProps) {
  const backgroundColor = useThemeColor({}, 'background');
  const insets = useSafeAreaInsets();
  const borderColor = useThemeColor(
    { light: Palette.gray200, dark: Palette.gray700 },
    'icon'
  );

  return (
    <View style={[styles.shell, { backgroundColor, paddingTop: insets.top }]}>
      {nav ? (
        <View style={[styles.nav, { borderBottomColor: borderColor }]}>
          {nav}
        </View>
      ) : null}
      {header ? (
        <View style={[styles.header, { borderBottomColor: borderColor }]}>
          {header}
        </View>
      ) : null}
      <View style={styles.body}>{children}</View>
      {footer ? (
        <View
          style={[
            styles.footer,
            { borderTopColor: borderColor, paddingBottom: insets.bottom },
          ]}
        >
          {footer}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    flex: 1,
  },
  nav: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  header: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  body: {
    flex: 1,
  },
  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
