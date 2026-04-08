import React from 'react';
import { ScrollView } from 'react-native';

// shared component
import { Container } from '@/components/ui/layout/container';
// shared component
import { Spacer } from '@/components/ui/layout/spacer';

type Props = {
  image?: React.ReactNode;
  info?: React.ReactNode;
  actions?: React.ReactNode;
};

export function FlavorsDetailScreen({ image, info, actions }: Props) {
  return (
    <ScrollView>
      <Container size="full" padded={false}>
        {image}
      </Container>
      <Spacer />
      <Container padded>
        {info}
        <Spacer />
        {actions}
      </Container>
    </ScrollView>
  );
}
