import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';

// shared component
import { Button } from '@/components/ui/primatives/button';
// shared component
import { FormField } from '@/components/ui/forms/form-field';
// shared component
import { TextField } from '@/components/ui/forms/text-field';
// shared component
import { TextArea } from '@/components/ui/forms/text-area';
// shared component
import { Spacer } from '@/components/ui/layout/spacer';
// shared theme constants
import { FontSize, FontWeight, Spacing } from '@/constants/theme';
// shared hook
import { useThemeColor } from '@/hooks/use-theme-color';

export type ContactFormProps = {
  initialEmail?: string;
  initialName?: string;
  initialMessage?: string;
};

export function ContactForm({
  initialEmail = '',
  initialName = '',
  initialMessage = '',
}: ContactFormProps) {
  const textColor = useThemeColor({}, 'text');

  const [email, setEmail] = useState(initialEmail);
  const [name, setName] = useState(initialName);
  const [message, setMessage] = useState(initialMessage);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={[styles.heading, { color: textColor }]}>Send a Message</Text>
      <Spacer size={3} />
      <View style={styles.form}>
        <FormField label="Email Address">
          <TextField
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            accessibilityLabel="Email address"
            keyboardType="email-address"
            autoComplete="email"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="emailAddress"
            returnKeyType="next"
          />
        </FormField>
        <FormField label="Name">
          <TextField
            value={name}
            onChangeText={setName}
            placeholder="Jane Smith"
            accessibilityLabel="Name"
            autoComplete="name"
            autoCapitalize="words"
            autoCorrect={false}
            textContentType="name"
            returnKeyType="next"
          />
        </FormField>
        <FormField label="Message">
          <TextArea
            value={message}
            onChangeText={setMessage}
            placeholder="How can we help?"
            accessibilityLabel="Message"
            autoCapitalize="sentences"
            autoCorrect
          />
        </FormField>
        <Button label="Send Message" onPress={() => {}} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: FontSize.lg,
    fontFamily: FontWeight.semibold,
  },
  form: {
    gap: Spacing[4],
  },
});
