import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { FontSize, FontWeight, Spacing } from '@/constants/theme'; // shared theme constants

export function ProfileForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.field}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          autoCapitalize="words"
          autoCorrect={false}
          returnKeyType="next"
          style={styles.input}
          accessibilityLabel="Name"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          textContentType="emailAddress"
          returnKeyType="done"
          style={styles.input}
          accessibilityLabel="Email"
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing[4],
    gap: Spacing[4],
  },
  field: {
    gap: Spacing[2],
  },
  label: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.semibold,
  },
  input: {
    minHeight: 44,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: Spacing[3],
    paddingVertical: Spacing[2],
  },
});
