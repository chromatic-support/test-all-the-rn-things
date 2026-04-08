import React from 'react';
import { ScrollView } from 'react-native';

// shared component
import { Container } from '@/components/ui/layout/container';
// shared component
import { Grid } from '@/components/ui/layout/grid';
// shared component
import { Spacer } from '@/components/ui/layout/spacer';

type Props = {
  image?: React.ReactNode;
  info?: React.ReactNode;
  options?: React.ReactNode;
  reviews?: React.ReactNode;
  addToCart?: React.ReactNode;
};

export function ShopDetailScreen({ image, info, options, reviews, addToCart }: Props) {
  return (
    <ScrollView>
      <Container size="full" padded={false}>
        {image}
      </Container>
      <Spacer />
      <Container padded>
        {options}
        <Spacer />
        <Grid columns={2}>
          {reviews}
          {addToCart}
        </Grid>
        <Spacer />
        {info}
      </Container>
    </ScrollView>
  );
}
