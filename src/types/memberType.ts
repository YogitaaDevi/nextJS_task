import { LocationType } from "./locationType";
import { SkillType } from "./skillType";

export interface MemberType {
  uid: string;
  name: string;
  location: LocationType;
  officeHours: string | null;
  openToWork: boolean;
  plnFriend: boolean;
  skills: SkillType[];
  isFeatured: boolean;
}
