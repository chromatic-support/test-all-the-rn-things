import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// shared component
import { Radio } from '@/components/ui/forms/radio';
// shared component
import { Checkbox } from '@/components/ui/forms/checkbox';
// shared component
import { FormField } from '@/components/ui/forms/form-field';
// shared component
import { TextField } from '@/components/ui/forms/text-field';
// shared component
import { Spacer } from '@/components/ui/layout/spacer';
// shared theme constants
import { FontSize, FontWeight, Palette, Spacing } from '@/constants/theme';
// shared hook
import { useThemeColor } from '@/hooks/use-theme-color';

export type PaymentMethodType = 'new-credit-card' | 'card-on-file';

export type SavedCard = {
  brand: string;
  last4: string;
  expiry: string;
  nickname: string;
  isDefault: boolean;
};

// Emitted when the new-credit-card form has enough data to construct a card
export type NewCardInfo = {
  saveCard: boolean;
  brand: string;
  last4: string;
  expiry: string;
  nickname: string;
};

export type PaymentMethodProps = {
  method: PaymentMethodType;
  onMethodChange: (method: PaymentMethodType) => void;
  savedCards?: SavedCard[];
  onNewCardChange?: (card: NewCardInfo | null) => void;
  onRemoveCard?: (last4: string) => void;
};

function detectBrand(cardNumber: string): string {
  const n = cardNumber.replace(/\s/g, '');
  if (n.startsWith('34') || n.startsWith('37')) return 'Amex';
  if (n.startsWith('4')) return 'Visa';
  if (n.startsWith('5') || n.startsWith('2')) return 'Mastercard';
  return 'Card';
}

export function PaymentMethod({
  method,
  onMethodChange,
  savedCards,
  onNewCardChange,
  onRemoveCard,
}: PaymentMethodProps) {
  const textColor = useThemeColor({}, 'text');
  const subtleColor = useThemeColor(
    { light: Palette.gray500, dark: Palette.gray400 },
    'icon'
  );
  const borderColor = useThemeColor(
    { light: Palette.gray200, dark: Palette.gray700 },
    'icon'
  );

  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [saveCard, setSaveCard] = useState(false);

  const sortedCards = savedCards
    ? [...savedCards].sort((a, b) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0))
    : [];

  const [selectedNickname, setSelectedNickname] = useState(
    sortedCards.find((c) => c.isDefault)?.nickname ?? sortedCards[0]?.nickname ?? ''
  );

  const hasCards = sortedCards.length > 0;

  const methods: { value: PaymentMethodType; label: string }[] = [
    { value: 'new-credit-card', label: 'New Credit Card' },
    ...(hasCards ? [{ value: 'card-on-file' as PaymentMethodType, label: 'Card on File' }] : []),
  ];

  function notifyCardChange(fields: {
    cardNumber: string;
    expiry: string;
    saveCard: boolean;
  }) {
    if (!onNewCardChange) return;
    const stripped = fields.cardNumber.replace(/\s/g, '');
    if (stripped.length < 4) {
      onNewCardChange(null);
      return;
    }
    const brand = detectBrand(stripped);
    const last4 = stripped.slice(-4);
    onNewCardChange({
      saveCard: fields.saveCard,
      brand,
      last4,
      expiry: fields.expiry,
      nickname: `${brand} ···· ${last4}`,
    });
  }

  function handleCardNumberChange(value: string) {
    setCardNumber(value);
    notifyCardChange({ cardNumber: value, expiry, saveCard });
  }

  function handleExpiryChange(value: string) {
    setExpiry(value);
    notifyCardChange({ cardNumber, expiry: value, saveCard });
  }

  function handleSaveCardChange(checked: boolean) {
    setSaveCard(checked);
    notifyCardChange({ cardNumber, expiry, saveCard: checked });
  }

  return (
    <View>
      <Text style={[styles.heading, { color: textColor }]}>Payment Method</Text>
      <Spacer size={3} />
      <View style={styles.radioGroup}>
        {methods.map((opt) => (
          <Radio
            key={opt.value}
            label={opt.label}
            selected={method === opt.value}
            onSelect={() => onMethodChange(opt.value)}
          />
        ))}
      </View>

      {method === 'new-credit-card' && (
        <>
          <Spacer size={4} />
          <View style={styles.form}>
            <FormField label="Card Number">
              <TextField
                value={cardNumber}
                onChangeText={handleCardNumberChange}
                placeholder="1234 5678 9012 3456"
                accessibilityLabel="Card number"
                keyboardType="numeric"
                autoComplete="cc-number"
                textContentType="creditCardNumber"
              />
            </FormField>
            <View style={styles.row}>
              <View style={styles.flex}>
                <FormField label="Expiry">
                  <TextField
                    value={expiry}
                    onChangeText={handleExpiryChange}
                    placeholder="MM/YY"
                    accessibilityLabel="Expiry date"
                    keyboardType="numeric"
                    autoComplete="cc-exp"
                  />
                </FormField>
              </View>
              <View style={styles.flex}>
                <FormField label="CVV">
                  <TextField
                    value={cvv}
                    onChangeText={setCvv}
                    placeholder="123"
                    accessibilityLabel="CVV"
                    keyboardType="numeric"
                    autoComplete="cc-csc"
                    secureTextEntry
                  />
                </FormField>
              </View>
            </View>
            <FormField label="Name on Card">
              <TextField
                value={nameOnCard}
                onChangeText={setNameOnCard}
                placeholder="Jane Smith"
                accessibilityLabel="Name on card"
                autoComplete="cc-name"
                autoCapitalize="words"
                autoCorrect={false}
                textContentType="name"
              />
            </FormField>
            <Checkbox
              label="Save this card for future orders"
              checked={saveCard}
              onChange={handleSaveCardChange}
            />
          </View>
        </>
      )}

      {method === 'card-on-file' && hasCards && (
        <>
          <Spacer size={4} />
          <View style={styles.cardList}>
            {sortedCards.map((card) => {
              const isSelected = selectedNickname === card.nickname;
              return (
                <View
                  key={card.nickname}
                  style={[
                    styles.cardOption,
                    { borderColor },
                    isSelected && styles.cardOptionSelected,
                  ]}
                >
                  <View style={styles.cardRow}>
                    <View style={styles.cardRadio}>
                      <Radio
                        label={`${card.nickname} · ${card.brand} ···· ${card.last4}`}
                        selected={isSelected}
                        onSelect={() => setSelectedNickname(card.nickname)}
                      />
                      <Text style={[styles.expiry, { color: subtleColor }]}>
                        Expires {card.expiry}
                      </Text>
                    </View>
                    {onRemoveCard && (
                      <Pressable
                        onPress={() => onRemoveCard(card.last4)}
                        accessibilityRole="button"
                        accessibilityLabel={`Remove ${card.nickname}`}
                        hitSlop={8}
                      >
                        {({ pressed }) => (
                          <MaterialIcons
                            name="delete-outline"
                            size={20}
                            color={pressed ? Palette.gray400 : subtleColor}
                          />
                        )}
                      </Pressable>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: FontSize.lg,
    fontFamily: FontWeight.semibold,
  },
  radioGroup: {
    gap: Spacing[2],
  },
  form: {
    gap: Spacing[4],
  },
  row: {
    flexDirection: 'row',
    gap: Spacing[4],
  },
  flex: {
    flex: 1,
  },
  cardList: {
    gap: Spacing[2],
  },
  cardOption: {
    borderWidth: 1,
    borderRadius: 10,
    padding: Spacing[3],
    gap: Spacing[1],
  },
  cardOptionSelected: {
    backgroundColor: `${Palette.brandLight}80`,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardRadio: {
    flex: 1,
    gap: Spacing[1],
  },
  expiry: {
    fontSize: FontSize.sm,
    fontFamily: FontWeight.normal,
  },
});
