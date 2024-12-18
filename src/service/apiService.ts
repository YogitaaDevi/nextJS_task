import { BASE_URL, PAGE_LIMIT } from "@/constants/constants";
import { FilterType } from "@/types/filterType";
import { MemberResponseType } from "@/types/memberResponseType";
import { MemberType } from "@/types/memberType";

export const fetchMembers = async (
  pageNumber: number,
  appliedFilters: FilterType
): Promise<MemberResponseType> => {
  try {
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
      !appliedFilters.regions
    )
      return data;
    const filteredData = data.members.filter((user: MemberType) => {
      const matchesEngagementType =
        (appliedFilters.officeHours && Boolean(user.officeHours)) ||
        (appliedFilters.openToCollaborate && user.openToWork) ||
        (appliedFilters.friends && user.plnFriend) ||
        (appliedFilters.newMembers && user.isFeatured) ||
        (appliedFilters.regions && user.location.continent)

      return matchesEngagementType;
    });
    return data = {count: filteredData.length, members: filteredData};
  } catch (error) {
    console.error("Error in fetching the members:", error);
    throw error;
  }
};

export const fetchFilters = async (): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/filters`);

    if (!response.ok) {
      throw new Error(`Error fetching filters: ${response.statusText}`);
    }
    const data = await response.json();
    return data.regions;
  } catch (error) {
    console.error("Error in fetchFilters:", error);
    throw error;
  }
};
