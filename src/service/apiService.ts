import { BASE_URL, PAGE_LIMIT } from "@/constants/constants";
import { FilterType } from "@/types/filterType";
import { MemberType } from "@/types/memberType";

export const fetchMembers = async (
  pageNumber: number,
  appliedFilters: FilterType
): Promise<MemberType[]> => {
  const response = await fetch(
    `${BASE_URL}?pagination=true&page=${pageNumber}&limit=${PAGE_LIMIT}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch members");
  }

  const data = await response.json();
  const members = Array.isArray(data.members) ? data.members : [];

  if (
    !appliedFilters.officeHours &&
    !appliedFilters.openToCollaborate &&
    !appliedFilters.friends &&
    !appliedFilters.newMembers
  ) {
    return members;
  }
  const filteredData = members.filter((user: MemberType) => {
    const matchesEngagementType =
      (appliedFilters.officeHours && Boolean(user.officeHours)) ||
      (appliedFilters.openToCollaborate && user.openToWork) ||
      (appliedFilters.friends && user.plnFriend) ||
      (appliedFilters.newMembers && user.isFeatured);

    return matchesEngagementType;
  });
  console.log(filteredData);
  return filteredData;
};
