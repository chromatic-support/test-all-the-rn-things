import React from 'react';
import { ScrollView } from 'react-native';

// shared component
import { Container } from '@/components/ui/layout/container';
// shared component
import { Spacer } from '@/components/ui/layout/spacer';

type Props = {
  hero?: React.ReactNode;
  contactMethods?: React.ReactNode;
  contactForm?: React.ReactNode;
};

export function ContactScreen({ hero, contactMethods, contactForm }: Props) {
  return (
    <ScrollView>
      <Container size="full" padded={false}>
        {hero}
      </Container>
      <Spacer />
      <Container padded>
        {contactMethods}
        <Spacer />
        {contactForm}
      </Container>
    </ScrollView>
  );
}
