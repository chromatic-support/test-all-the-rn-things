import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// shared component
import { ContactScreen as ContactTemplate } from '@/components/ui/layout/screen-templates/contact';
// shared component
import { ContactHero } from '@/components/composites/heroes/contact';
// shared component
import { ContactMethods } from '@/components/composites/contact/contact-methods';
import type { ContactMethodType } from '@/components/composites/contact/contact-methods';
// shared component
import { ContactForm } from '@/components/composites/contact/contact-form';
// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from '@/constants/theme';
// shared hook
import { useThemeColor } from '@/hooks/use-theme-color';

type ContactProps = {
  phoneNumber?: string;
  initialMethod?: ContactMethodType;
};

export function Contact({
  phoneNumber = '(555) 000-0000',
  initialMethod = 'email',
}: ContactProps = {}) {
  const [method, setMethod] = useState<ContactMethodType>(initialMethod);
  const textColor = useThemeColor({}, 'text');

  return (
    <ContactTemplate
      hero={<ContactHero />}
      contactMethods={
        <ContactMethods method={method} onMethodChange={setMethod} />
      }
      contactForm={
        method === 'email' ? (
          <ContactForm />
        ) : (
          <View style={styles.phoneContainer}>
            <Text style={[styles.phoneLabel, { color: Palette.gray500 }]}>
              Give us a call
            </Text>
            <Text style={[styles.phoneNumber, { color: textColor }]}>
              {phoneNumber}
            </Text>
          </View>
        )
      }
    />
  );
}

const styles = StyleSheet.create({
  phoneContainer: {
    gap: Spacing[1],
    alignItems: 'center',
  },
  phoneLabel: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.normal,
  },
  phoneNumber: {
    fontSize: FontSize.xl,
    fontFamily: FontWeight.semibold,
  },
});
