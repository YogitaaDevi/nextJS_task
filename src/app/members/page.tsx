import React from "react";
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import "./style.css";
import DisplayMembers from "@/components/displayMembers/DisplayMembers";
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
    members: MemberResponseType;
    location: LocationType[];
  }> => {
    const filters = await fetchFilters();
    const roleData = await fetchRoles();
    const members = await fetchMembers(appliedFilters);

    const location = members.members.map((member) => member.location);
    return { filters, roleData, members, location };
  };
  const { filters, roleData, members, location } = await getData();
  return (
    <>
      <Header />
      <div className="flex main__layout">
        <Sidebar data={filters} roleData={roleData} location={location} />
        <div className="flex flex-col main__layout__membersSide">
          <DisplayMembers data={members} appliedFilters={appliedFilters} />
        </div>
      </div>
    </>
  );
};

export default page;
