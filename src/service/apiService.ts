import { BASE_URL, PAGE_LIMIT } from "@/constants/constants";
import { FilterType } from "@/types/filterType";
import { memberEngagementType } from "@/types/memberEngagementType";
import { MemberResponseType } from "@/types/memberResponseType";
import { MemberType } from "@/types/memberType";

export const fetchMembers = async (
  pageNumber: number,
  appliedFilters: memberEngagementType
): Promise<MemberResponseType> => {
  try {
    let filteredData;
    const response = await fetch(
      `${BASE_URL}?pagination=true&page=${pageNumber}&limit=${PAGE_LIMIT}&select=uid,name,location,skills,officeHours,openToWork,plnFriend,isFeatured`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch members");
    }
    let data = await response.json();
    if (
      !appliedFilters.officeHours &&
      !appliedFilters.openToCollaborate &&
      !appliedFilters.friends &&
      !appliedFilters.newMembers &&
      !appliedFilters.searchMembers
    )
      return data;

    filteredData = data.members.filter((user: MemberType) => {
      const matchesEngagementType =
        (appliedFilters.officeHours && Boolean(user.officeHours)) ||
        (appliedFilters.openToCollaborate && user.openToWork) ||
        (appliedFilters.friends && user.plnFriend) ||
        (appliedFilters.newMembers && user.isFeatured) ||
        (appliedFilters.searchMembers &&
          user.name
            .toLowerCase()
            .includes(appliedFilters.searchMembers.toLowerCase()));
      return matchesEngagementType;
    });
    return (data = { count: filteredData.length, members: filteredData });
  } catch (error) {
    console.error("Error in fetching the members:", error);
    throw error;
  }
};

export const fetchFilters = async (): Promise<FilterType> => {
  try {
    const response = await fetch(`${BASE_URL}/filters`);

    if (!response.ok) {
      throw new Error(`Error fetching filters: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetchFilters:", error);
    throw error;
  }
};
