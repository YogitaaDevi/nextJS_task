import { PAGE_LIMIT } from "@/constants/constants";
import { FilterType } from "@/types/filterType";
import { MemberFilterType } from "@/types/memberFilterType";
import { MemberResponseType } from "@/types/memberResponseType";
import { RoleType } from "@/types/roleType";
import { useSearchParams } from "next/navigation";

const BASE_URL = `${process.env.NEXT_PUBLIC_DIRECTORY_API_URL}/v1/members`;

export const fetchMembers = async (
  appliedFilters: MemberFilterType = {},
  pageNumber: number = 1
): Promise<MemberResponseType> => {
  try {
    const stringifyQueryValues = (values: string[]) => {
      if (values && Array.isArray(values)) return values.join(",");
      return [];
    };
    const filterQuery = {
      ...(appliedFilters.officeHoursOnly ? { officeHours__not: "null" } : {}),
      ...(appliedFilters.includeFriends
        ? { isVerified: "all" }
        : { plnFriend: false, isVerified: "true" }),
      ...(appliedFilters.openToWork ? { openToWork: true } : {}),
      ...(appliedFilters.isRecent ? { isRecent: true } : {}),
      ...(appliedFilters.memberRoles?.length
        ? { memberRoles: stringifyQueryValues(appliedFilters.memberRoles) }
        : {}),
      ...(appliedFilters.searchBy
        ? { name__icontains: appliedFilters.searchBy.trim() }
        : {}),
      ...(appliedFilters.skills?.length
        ? { "skills.title__with": stringifyQueryValues(appliedFilters.skills) }
        : {}),
      orderBy: `${
        appliedFilters.sortBy === "desc" ? "-" : ""
      }${appliedFilters.sortField?.toLowerCase()}`,
    };
    console.log(filterQuery.memberRoles);
    const queryString = Object.entries(filterQuery)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`
      )
      .join("&");
    console.log(queryString, "-------------------querystring");
    const response = await fetch(
      `${BASE_URL}?pagination=true&page=${pageNumber}&limit=${PAGE_LIMIT}&select=uid,name,location,skills,officeHours,openToWork,plnFriend,isFeatured,memberRoles${
        queryString.length && `&${queryString}`
      }`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch members");
    }
    return await response.json();
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
