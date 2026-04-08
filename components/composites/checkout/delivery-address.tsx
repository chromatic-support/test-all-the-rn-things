import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// shared component
import { FormField } from '@/components/ui/forms/form-field';
// shared component
import { TextField } from '@/components/ui/forms/text-field';
// shared component
import { Select } from '@/components/ui/forms/select';
// shared component
import { Spacer } from '@/components/ui/layout/spacer';
// shared theme constants
import { FontSize, FontWeight, Spacing } from '@/constants/theme';
// shared hook
import { useThemeColor } from '@/hooks/use-theme-color';

const US_STATES = [
  { label: 'Alabama', value: 'AL' },
  { label: 'Alaska', value: 'AK' },
  { label: 'Arizona', value: 'AZ' },
  { label: 'Arkansas', value: 'AR' },
  { label: 'California', value: 'CA' },
  { label: 'Colorado', value: 'CO' },
  { label: 'Connecticut', value: 'CT' },
  { label: 'Delaware', value: 'DE' },
  { label: 'Florida', value: 'FL' },
  { label: 'Georgia', value: 'GA' },
  { label: 'Hawaii', value: 'HI' },
  { label: 'Idaho', value: 'ID' },
  { label: 'Illinois', value: 'IL' },
  { label: 'Indiana', value: 'IN' },
  { label: 'Iowa', value: 'IA' },
  { label: 'Kansas', value: 'KS' },
  { label: 'Kentucky', value: 'KY' },
  { label: 'Louisiana', value: 'LA' },
  { label: 'Maine', value: 'ME' },
  { label: 'Maryland', value: 'MD' },
  { label: 'Massachusetts', value: 'MA' },
  { label: 'Michigan', value: 'MI' },
  { label: 'Minnesota', value: 'MN' },
  { label: 'Mississippi', value: 'MS' },
  { label: 'Missouri', value: 'MO' },
  { label: 'Montana', value: 'MT' },
  { label: 'Nebraska', value: 'NE' },
  { label: 'Nevada', value: 'NV' },
  { label: 'New Hampshire', value: 'NH' },
  { label: 'New Jersey', value: 'NJ' },
  { label: 'New Mexico', value: 'NM' },
  { label: 'New York', value: 'NY' },
  { label: 'North Carolina', value: 'NC' },
  { label: 'North Dakota', value: 'ND' },
  { label: 'Ohio', value: 'OH' },
  { label: 'Oklahoma', value: 'OK' },
  { label: 'Oregon', value: 'OR' },
  { label: 'Pennsylvania', value: 'PA' },
  { label: 'Rhode Island', value: 'RI' },
  { label: 'South Carolina', value: 'SC' },
  { label: 'South Dakota', value: 'SD' },
  { label: 'Tennessee', value: 'TN' },
  { label: 'Texas', value: 'TX' },
  { label: 'Utah', value: 'UT' },
  { label: 'Vermont', value: 'VT' },
  { label: 'Virginia', value: 'VA' },
  { label: 'Washington', value: 'WA' },
  { label: 'West Virginia', value: 'WV' },
  { label: 'Wisconsin', value: 'WI' },
  { label: 'Wyoming', value: 'WY' },
];

export type AddressValues = {
  name: string;
  street: string;
  apt: string;
  city: string;
  state: string | null;
  zip: string;
};

export type DeliveryAddressProps = {
  initialName?: string;
  initialStreet?: string;
  initialApt?: string;
  initialCity?: string;
  initialState?: string | null;
  initialZip?: string;
  onAddressChange?: (address: AddressValues) => void;
};

export function DeliveryAddress({
  initialName = '',
  initialStreet = '',
  initialApt = '',
  initialCity = '',
  initialState = null,
  initialZip = '',
  onAddressChange,
}: DeliveryAddressProps) {
  const textColor = useThemeColor({}, 'text');

  const [name, setName] = useState(initialName);
  const [street, setStreet] = useState(initialStreet);
  const [apt, setApt] = useState(initialApt);
  const [city, setCity] = useState(initialCity);
  const [state, setState] = useState<string | null>(initialState);
  const [zip, setZip] = useState(initialZip);

  useEffect(() => {
    onAddressChange?.({ name, street, apt, city, state, zip });
  }, [name, street, apt, city, state, zip, onAddressChange]);

  return (
    <View>
      <Text style={[styles.heading, { color: textColor }]}>Delivery Address</Text>
      <Spacer size={3} />
      <View style={styles.form}>
        <FormField label="Full Name">
          <TextField
            value={name}
            onChangeText={setName}
            placeholder="Jane Smith"
            accessibilityLabel="Full name"
            autoComplete="name"
            autoCapitalize="words"
            autoCorrect={false}
            textContentType="name"
          />
        </FormField>
        <FormField label="Street Address">
          <TextField
            value={street}
            onChangeText={setStreet}
            placeholder="123 Main St"
            accessibilityLabel="Street address"
            autoComplete="street-address"
            autoCapitalize="words"
            autoCorrect={false}
            textContentType="streetAddressLine1"
          />
        </FormField>
        <FormField label="Apt, Suite, etc. (optional)">
          <TextField
            value={apt}
            onChangeText={setApt}
            placeholder="Apt 4B"
            accessibilityLabel="Apartment or suite"
            autoComplete="address-line2"
            autoCapitalize="words"
            autoCorrect={false}
            textContentType="streetAddressLine2"
          />
        </FormField>
        <FormField label="City">
          <TextField
            value={city}
            onChangeText={setCity}
            placeholder="New York"
            accessibilityLabel="City"
            autoComplete="address-line2"
            autoCapitalize="words"
            autoCorrect={false}
            textContentType="addressCity"
          />
        </FormField>
        <View style={styles.row}>
          <View style={styles.stateField}>
            <FormField label="State">
              <Select
                options={US_STATES}
                value={state}
                onChange={setState}
                placeholder="State"
              />
            </FormField>
          </View>
          <View style={styles.zipField}>
            <FormField label="ZIP Code">
              <TextField
                value={zip}
                onChangeText={setZip}
                placeholder="10001"
                accessibilityLabel="ZIP code"
                keyboardType="numeric"
                autoComplete="postal-code"
                textContentType="postalCode"
              />
            </FormField>
          </View>
        </View>
      </View>
    </View>
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
  row: {
    flexDirection: 'row',
    gap: Spacing[4],
  },
  stateField: {
    flex: 1,
  },
  zipField: {
    width: 110,
  },
});
