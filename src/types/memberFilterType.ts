export interface MemberFilterType {
  officeHoursOnly?: boolean;
  openToWork?: boolean;
  includeFriends?: boolean;
  isRecent?: boolean;
  sortField?: string;
  memberRoles?: string[];
  sortBy?: string;
  skills?: string[];
  searchBy?: string;
  region?: string[];
  country?: string[];
  metroArea? : string[]
}
