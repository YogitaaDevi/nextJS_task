"use client";
import React, { useState } from "react";
import "./style.css";
import { useRouter, useSearchParams } from "next/navigation";
import TextField from "../textfield/TextField";
import RegionCard from "../card/RegionCard";
import { FilterType } from "@/types/filterType";
import { INITIAL_VISIBLE_COUNT } from "@/constants/constants";
import { RoleType } from "@/types/roleType";
import RoleCard from "../card/RoleCard";

interface SidebarProps {
  data: FilterType;
  roles?: RoleType[];
}
const Sidebar = ({ data, roles }: SidebarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams.toString());
  const [count, setCount] = useState<number>(INITIAL_VISIBLE_COUNT);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const handleFilterChange = (filter: string, event?: any) => {
    const isChecked = event.target.checked;
    if (isChecked) currentParams.set(filter, "true");
    else currentParams.delete(filter);
    router.push(`?${currentParams.toString()}`);
  };
  const handleClearFilters = () => {
    router.push(`?`);
  };
  return (
    <div className="sidebar">
      <div className="flex items-center justify-around sidebar__header">
        <h3 className="sidebar__header__text">Filters</h3>
        <div
          className="sidebar__header__text--clearFilter"
          onClick={handleClearFilters}
        >
          Clear filters
        </div>
      </div>
      <div className="sidebar__filter flex flex-col">
        <div className="sidebar__filter__bymember flex flex-col">
          <div className="filter__bymember__option flex items-center justify-between">
            Only Show Members with Office Hours
            <label className="switch">
              <TextField
                type="checkbox"
                onChange={() => handleFilterChange("OfficeHours", event)}
                checked={searchParams.get("OfficeHours") === "true"}
              />
            </label>
          </div>
          <div className="filter__bymember__option flex items-center justify-between">
            Open to Collaborate
            <label className="switch">
              <TextField
                type="checkbox"
                onChange={() => handleFilterChange("Collaborate", event)}
                checked={searchParams.get("Collaborate") === "true"}
              />
            </label>
          </div>
          <div className="filter__bymember__option flex items-center justify-between">
            Include Friends of Protocol Labs
            <label className="switch">
              <TextField
                type="checkbox"
                onChange={() => handleFilterChange("Friends", event)}
                checked={searchParams.get("Friends") === "true"}
              />
            </label>
          </div>
          <div className="filter__bymember__option flex items-center justify-between">
            New Members
            <label className="switch">
              <TextField
                type="checkbox"
                onChange={() => handleFilterChange("NewMembers", event)}
                checked={searchParams.get("NewMembers") === "true"}
              />
            </label>
          </div>
        </div>
        <div className="sidebar__filter__byregion flex flex-col">
          <div className="region-text">Region</div>
          <div className="region-names flex flex-wrap">
            {data.regions.map((item: string, index: number) => (
              <RegionCard item={item} key={index} />
            ))}
          </div>
        </div>
        <div className="sidebar__filter__bycountries flex flex-col">
          <div className="region-text">Roles</div>
          <div className="filter__bysearch flex items-center">
            <img src="/icons/search-gray.svg" alt="" className="search_icon" />
            <TextField
              type="text"
              className="search_input"
              placeholder="Search Role [eg. Engineer]"
            />
          </div>
          <div className="flex flex-col gap-5">
            {roles?.map((role, index: number) => (
              <RoleCard key={index} role={role} />
            ))}
          </div>
        </div>
        <div className="sidebar__filter__bycountries flex flex-col">
          <div className="region-text">Country</div>
          <div className="region-names flex flex-wrap">
            {isVisible
              ? data.countries.map((item: string, index: number) => (
                  <RegionCard item={item} key={index} />
                ))
              : data.countries
                  .slice(0, INITIAL_VISIBLE_COUNT)
                  .map((item: string, index: number) => (
                    <RegionCard item={item} key={index} />
                  ))}
            <div
              className="region-hidden flex items-center"
              onClick={() => setIsVisible((prev) => !prev)}
            >
              {isVisible ? (
                <>
                  Show less <img src="/icons/filter-dropdown.svg" alt="" />
                  <div className="region-count flex justify-center items-center">
                    {0}
                  </div>
                </>
              ) : (
                <>
                  Show more <img src="/icons/filter-dropdown.svg" alt="" />
                  <div className="region-count flex justify-center items-center">
                    {data.countries.length - INITIAL_VISIBLE_COUNT}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="sidebar__filter__bycountries flex flex-col">
          <div className="region-text">Skills</div>
          <div className="region-names flex flex-wrap">
            {data.skills.slice(0, count).map((item: string, index: number) => (
              <RegionCard item={item} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
