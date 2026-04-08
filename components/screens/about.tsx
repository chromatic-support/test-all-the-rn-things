import React from "react";

// shared component
import { AboutScreen } from "@/components/ui/layout/screen-templates/about";
// shared component
import { AboutBrandHero } from "@/components/composites/heroes/about-brand";
// shared component
import { OurStory } from "@/components/composites/about/our-story";
// shared component
import { MissionValues } from "@/components/composites/about/mission-values";
// shared component
import { TeamSection } from "@/components/composites/about/team";

const PEACH_PRINCESS =
  require("@/assets/img/flavors/peach-princess.png") as number;
const PERU_PASSION = require("@/assets/img/flavors/peru-passion.png") as number;
const LEAF = require("@/assets/img/leaf.png") as number;
const HALF_MOON = require("@/assets/img/flavors/half-moon.png") as number;
const TOO_MANY_HABIBIS =
  require("@/assets/img/marketing/too-many-habibis.png") as number;
const WATERMELON =
  require("@/assets/img/marketing/watermelon-can-purple.png") as number;
const CHAI = require("@/assets/img/flavors/chai-constellation.png") as number;
const PEP = require("@/assets/img/marketing/pep-in-your-step.png") as number;

const TEAM_MEMBERS = [
  { name: "Alex Kim", role: "Founder", imageSource: PEACH_PRINCESS },
  { name: "Jordan Lee", role: "Designer", imageSource: PERU_PASSION },
  { name: "Sam Okonkwo", role: "Engineer", imageSource: LEAF },
  { name: "Riley Cruz", role: "Marketing", imageSource: HALF_MOON },
  { name: "Morgan Patel", role: "Operations", imageSource: TOO_MANY_HABIBIS },
  { name: "Casey Wu", role: "Sales", imageSource: WATERMELON },
  { name: "Drew Nzinga", role: "Support", imageSource: CHAI },
  { name: "Quinn Russo", role: "Finance", imageSource: PEP },
];

export function About() {
  return (
    <AboutScreen
      hero={<AboutBrandHero tagline="About Us" />}
      ourStory={<OurStory />}
      missionValues={<MissionValues />}
      team={<TeamSection members={TEAM_MEMBERS} />}
    />
  );
}
