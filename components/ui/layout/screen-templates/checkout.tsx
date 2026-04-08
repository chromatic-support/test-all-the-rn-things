import React from "react";
import { ScrollView } from "react-native";

// shared component
import { Container } from "@/components/ui/layout/container";
// shared component
import { Divider } from "@/components/ui/layout/divider";
// shared component
import { Grid } from "@/components/ui/layout/grid";
// shared component
import { Spacer } from "@/components/ui/layout/spacer";

type Props = {
  hero?: React.ReactNode;
  orderSummary?: React.ReactNode;
  deliveryAddress?: React.ReactNode;
  paymentMethod?: React.ReactNode;
  orderTotal?: React.ReactNode;
  placeOrder?: React.ReactNode;
  confirmation?: React.ReactNode;
  shippingSummary?: React.ReactNode;
};

export function CheckoutScreen({
  hero,
  orderSummary,
  deliveryAddress,
  paymentMethod,
  orderTotal,
  placeOrder,
  confirmation,
  shippingSummary,
}: Props) {
  if (confirmation) {
    return (
      <ScrollView>
        <Container size="full" padded={false}>
          {hero}
        </Container>
        <Spacer />
        <Container padded>
          {confirmation}
          {shippingSummary && (
            <>
              <Spacer />
              <Divider />
              <Spacer />
              {shippingSummary}
            </>
          )}
        </Container>
        <Spacer size={8} />
      </ScrollView>
    );
  }

  return (
    <ScrollView>
      <Container size="full" padded={false}>
        {hero}
      </Container>
      <Spacer />
      <Container padded>
        {orderSummary}
        {deliveryAddress && (
          <>
            <Spacer />
            <Divider />
            <Spacer />
            {deliveryAddress}
          </>
        )}
        {paymentMethod && (
          <>
            <Spacer />
            <Divider />
            <Spacer />
            {paymentMethod}
          </>
        )}
        {(orderTotal || placeOrder) && (
          <>
            <Spacer />
            <Divider />
            <Spacer />
            <Grid columns={2}>
              {orderTotal}
              {placeOrder}
            </Grid>
          </>
        )}
      </Container>
      <Spacer size={8} />
    </ScrollView>
  );
}
