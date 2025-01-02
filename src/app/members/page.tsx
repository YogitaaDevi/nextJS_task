import React from "react";
import Header from "@/components/core/header/Header";
import Sidebar from "@/components/core/sidebar/Sidebar";
import "./page.module.css";
import {
  fetchFilters,
  fetchMembers,
  fetchRoles,
} from "@/service/member.service";
import { FilterType } from "@/types/filterType";
import { RoleType } from "@/types/roleType";
import { MemberFilterType } from "@/types/memberFilterType";
import { MemberResponseType } from "@/types/memberResponseType";
import { LocationType } from "@/types/locationType";
import MembersPage from "@/components/page/members-page/MembersPage";

const page = async ({ searchParams }: any) => {
  const filterChange = async (): Promise<MemberFilterType> => {
    const {
      sort = "",
      officeHoursOnly,
      openToWork,
      includeFriends,
      isRecent,
      memberRoles,
      skills,
      searchBy = "",
    } = await searchParams;
    const sortByValue = sort || "";
    const [sortField, sortBy] = sortByValue.split(",");
    return {
      officeHoursOnly: officeHoursOnly === "true",
      openToWork: openToWork === "true",
      includeFriends: includeFriends === "true",
      isRecent: isRecent === "true",
      sortField: sortField || "name",
      sortBy: sortBy || "asc",
      memberRoles:
        typeof memberRoles === "string" ? memberRoles.split("|") : [],
      skills: typeof skills === "string" ? skills.split("|") : [],
      searchBy: searchBy || "",
    };
  };
  const appliedFilters = await filterChange();

  const getData = async (): Promise<{
    filters: FilterType;
    roleData: RoleType[];
    currentMembers: MemberResponseType;
    location: LocationType[];
  }> => {
    const filters = await fetchFilters();
    const roleData = await fetchRoles();
    const currentMembers = await fetchMembers(appliedFilters);

    const location = currentMembers.members.map((member) => member.location);
    return { filters, roleData, currentMembers, location };
  };
  const { filters, roleData, currentMembers, location } = await getData();
  return (
    <>
      <Header />
      <div className="main__layout">
        <Sidebar data={filters} roleData={roleData} location={location} />
        <div className="main__layout__membersSide">
          <MembersPage data={currentMembers} appliedFilters={appliedFilters} />
        </div>
      </div>
    </>
  );
};

export default page;
