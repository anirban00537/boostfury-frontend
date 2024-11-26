import {
  pattern1,
  pattern10,
  pattern2,
  pattern3,
  pattern4,
  pattern5,
  pattern6,
  pattern7,
  pattern8,
  pattern9,
} from "@/components/editor/shared-components/Backgrounds.comp";
import {
  Icon1,
  Icon2,
  Icon3,
  Icon4,
  Icon5,
  Icon6,
  Icon7,
  Icon8,
  Icon9,
  Icon10,
  Icon11,
  Icon12,
} from "@/components/editor/shared-components/Shared-Icons.comp";

export const carouselsSize = [
  {
    id: 1,
    platform: "Linkedin",
    ratio: "4:5",
    width: 500,
    height: 640,
  },
  {
    id: 2,
    platform: "Linkedin",
    ratio: "5:5",
    width: 600,
    height: 600,
  },
  {
    id: 3,
    platform: "Instagram",
    ratio: "4:5",
    width: 480,
    height: 600,
  },
];

export const sharedElements = [
  {
    id: 1,
    name: "icon one",
    component: Icon1,
  },
  {
    id: 2,
    name: "icon two",
    component: Icon2,
  },
  {
    id: 3,
    name: "icon three",
    component: Icon3,
  },
  {
    id: 4,
    name: "icon four",
    component: Icon4,
  },
  {
    id: 5,
    name: "icon five",
    component: Icon5,
  },
  {
    id: 6,
    name: "icon six",
    component: Icon6,
  },
  {
    id: 7,
    name: "icon seven",
    component: Icon7,
  },
  {
    id: 8,
    name: "icon eight",
    component: Icon8,
  },
  {
    id: 9,
    name: "icon nine",
    component: Icon9,
  },
  {
    id: 10,
    name: "icon ten",
    component: Icon10,
  },
  {
    id: 11,
    name: "icon eleven",
    component: Icon11,
  },
  {
    id: 12,
    name: "icon twelve",
    component: Icon12,
  },
];

export const backgroundPatterns = [
  {
    id: 1,
    name: "pattern one",
    svg: pattern1("black"),
  },
  {
    id: 2,
    name: "pattern two",
    svg: pattern2("black"),
  },
  {
    id: 3,
    name: "pattern three",
    svg: pattern3("black"),
  },
  {
    id: 4,
    name: "pattern four",
    svg: pattern4("black"),
  },
  {
    id: 5,
    name: "pattern five",
    svg: pattern5("black"),
  },
  {
    id: 6,
    name: "pattern six",
    svg: pattern6("black"),
  },
  {
    id: 7,
    name: "pattern seven",
    svg: pattern7("black"),
  },
  {
    id: 8,
    name: "pattern eight",
    svg: pattern8("black"),
  },
  {
    id: 9,
    name: "pattern nine",
    svg: pattern9("black"),
  },
  {
    id: 10,
    name: "pattern ten",
    svg: pattern10("black"),
  },
];

export const POST_STATUS = {
  DRAFT: 0,
  SCHEDULED: 1,
  PUBLISHED: 2,
  FAILED: 3,
};

export const DAYS_OF_WEEK = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
} as const;
