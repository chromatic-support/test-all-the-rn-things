import React from "react";
import { ScrollView } from "react-native";

// shared component
import { Container } from "@/components/ui/layout/container";
// shared component
import { Spacer } from "@/components/ui/layout/spacer";

type Props = {
  hero?: React.ReactNode;
  ourStory?: React.ReactNode;
  missionValues?: React.ReactNode;
  team?: React.ReactNode;
};

export function AboutScreen({ hero, ourStory, missionValues, team }: Props) {
  return (
    <ScrollView>
      <Container size="full" padded={false}>
        {hero}
      </Container>
      <Spacer size={6} />
      <Container padded>
        {ourStory}
        <Spacer size={6} />
        {missionValues}
        <Spacer size={8} />
        {team}
      </Container>
    </ScrollView>
  );
}
