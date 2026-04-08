import React from 'react';
import { ScrollView } from 'react-native';

// shared component
import { Container } from '@/components/ui/layout/container';
// shared component
import { Spacer } from '@/components/ui/layout/spacer';

type Props = {
  balance?: React.ReactNode;
  rewardsOffers?: React.ReactNode;
  activityHistory?: React.ReactNode;
};

export function RewardsScreen({ balance, rewardsOffers, activityHistory }: Props) {
  return (
    <ScrollView>
      <Container size="full" padded={false}>
        {balance}
      </Container>
      <Spacer />
      <Container padded>
        {rewardsOffers}
        <Spacer />
        {activityHistory}
      </Container>
    </ScrollView>
  );
}
