import React from 'react';
import { ScrollView } from 'react-native';

// shared component
import { Container } from '@/components/ui/layout/container';
// shared component
import { Spacer } from '@/components/ui/layout/spacer';

type Props = {
  hero?: React.ReactNode;
  map?: React.ReactNode;
  results?: React.ReactNode;
};

export function FindScreen({ hero, map, results }: Props) {
  return (
    <ScrollView>
      <Container size="full" padded={false}>
        {hero}
      </Container>
      <Spacer />
      <Container size="full" padded={false}>
        {map}
      </Container>
      <Spacer />
      <Container padded>
        {results}
      </Container>
    </ScrollView>
  );
}
