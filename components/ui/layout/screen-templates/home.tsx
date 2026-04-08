import React from 'react';
import { ScrollView } from 'react-native';

// shared component
import { Container } from '@/components/ui/layout/container';
// shared component
import { Spacer } from '@/components/ui/layout/spacer';

type Props = {
  featured?: React.ReactNode;
  action?: React.ReactNode;
  rewards?: React.ReactNode;
  recommendations?: React.ReactNode;
};

export function HomeScreen({ featured, action, rewards, recommendations }: Props) {
  return (
    <ScrollView>
      <Container size="full" padded={false}>
        {featured}
      </Container>
      <Spacer />
      <Container padded>
        {action}
      </Container>
      <Spacer />
      <Container size="full" padded={false}>
        {rewards}
      </Container>
      <Spacer />
      <Container padded>
        {recommendations}
      </Container>
    </ScrollView>
  );
}
