import React from "react";
import { ScrollView } from "react-native";

// shared component
import { Container } from "@/components/ui/layout/container";
// shared component
import { Spacer } from "@/components/ui/layout/spacer";

type Props = {
  hero?: React.ReactNode;
  items?: React.ReactNode;
  pagination?: React.ReactNode;
  promo?: React.ReactNode;
};

export function ShopMenuScreen({ hero, items, pagination, promo }: Props) {
  return (
    <ScrollView>
      <Container size="full" padded={false}>
        {hero}
      </Container>
      <Spacer />
      <Container padded>
        {items}
        <Spacer />
        {pagination}
      </Container>
      <Spacer />
      <Container size="full" padded={false}>
        {promo}
      </Container>
    </ScrollView>
  );
}
