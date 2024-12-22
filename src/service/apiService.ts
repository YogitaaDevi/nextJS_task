import { BASE_URL, PAGE_LIMIT } from "@/constants/constants";
import { FilterType } from "@/types/filterType";
import { memberFilterType } from "@/types/memberFilterType";
import { MemberResponseType } from "@/types/memberResponseType";
import { MemberType } from "@/types/memberType";
import { RoleType } from "@/types/roleType";

export const fetchMembers = async (
  pageNumber: number,
  appliedFilters: memberFilterType
): Promise<MemberResponseType> => {
  try {
    const response = await fetch(
      `${BASE_URL}?pagination=true&page=${pageNumber}&limit=${PAGE_LIMIT}&select=uid,name,location,skills,officeHours,openToWork,plnFriend,isFeatured`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch members");
    }

    const data = await response.json();
    const {
      officeHours,
      openToCollaborate,
      friends,
      newMembers,
      searchMembers,
      sortMembers,
    } = appliedFilters;

    if (
      !officeHours &&
      !openToCollaborate &&
      !friends &&
      !newMembers &&
      !searchMembers
    ) {
      return {
        count: data.count,
        members: sortMembers
          ? data.members.sort((a: MemberType, b: MemberType) =>
              sortMembers === "Descending"
                ? b.name.localeCompare(a.name)
                : a.name.localeCompare(b.name)
            )
          : data.members.sort((a: MemberType, b: MemberType) =>
              a.name.localeCompare(b.name)
            ),
      };
    }

    const filteredData = data.members.filter((user: MemberType) => {
      const matchesFilter =
        (officeHours && Boolean(user.officeHours)) ||
        (openToCollaborate && user.openToWork) ||
        (friends && user.plnFriend) ||
        (newMembers && user.isFeatured) ||
        (searchMembers &&
          user.name.toLowerCase().includes(searchMembers.toLowerCase()));
      return matchesFilter;
    });

    const sortedData = filteredData.sort((a: MemberType, b: MemberType) =>
      sortMembers === "Descending"
        ? b.name.localeCompare(a.name)
        : a.name.localeCompare(b.name)
    );

    return {
      count: sortedData.length,
      members: sortedData,
    };
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
    return await response.json();
  } catch (error) {
    console.error("Error in fetchFilters:", error);
    throw error;
  }
};

export const fetchRoles = async (value?: string): Promise<RoleType[]> => {
  try {
    let response;
    if (value?.length) {
      response = await fetch(`${BASE_URL}/roles?searchText=${value}`);
      const data = await response.json();
      const sortedRoles = data.sort((a: RoleType, b: RoleType) =>
        a.role.localeCompare(b.role)
      );
      return sortedRoles;
    } else {
      response = await fetch(`${BASE_URL}/roles`);
      return await response.json();
    }
  } catch (error) {
    throw error;
  }
};
