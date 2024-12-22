"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TextField from "../textfield/TextField";
import RegionCard from "../card/RegionCard";
import { FilterType } from "@/types/filterType";
import { INITIAL_VISIBLE_COUNT } from "@/constants/constants";
import { RoleType } from "@/types/roleType";
import RoleCard from "../card/RoleCard";
import { fetchRoles } from "@/service/apiService";

interface SidebarProps {
  data: FilterType;
  // roles?: RoleType[];
}

const Sidebar = ({ data }: SidebarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams.toString());
  const [count, setCount] = useState<number>(0);
  const [isCountriesVisible, setIsCountriesVisible] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [isSkillsVisible, setIsSkillsVisible] = useState<boolean>(false);
  const [roles, setRoles] = useState<RoleType[]>([]);
  const getRoles = async (value?: string) => {
    let response;
    if (value?.length) response = await fetchRoles(value);
    else response = await fetchRoles();
    setRoles(response);
  };

  useEffect(() => {
    if (search.length > 0) {
      getRoles(search);
    } else {
      getRoles();
    }
  }, [search]);
console.log(roles)
  const handleFilterChange = (filter: string, event?: any) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setCount((prev) => prev + 1);
      currentParams.set(filter, "true");
    } else {
      setCount((prev) => prev - 1);
      currentParams.delete(filter);
    }
    router.push(`?${currentParams.toString()}`);
  };

  const handleClearFilters = () => {
    router.push(`?`);
    setCount(0);
  };

  return (
    <div className="sidebar">
      <div className="flex items-center justify-around sidebar__header">
        <div className="flex items-center gap-10">
          <h3 className="sidebar__header__text">Filters</h3>
          {count > 0 && (
            <div className="header__count flex justify-center items-center">
              {count}
            </div>
          )}
        </div>
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
              value={search}
              className="search_input"
              placeholder="Search Role [eg. Engineer]"
              onChange={(e: any) => setSearch(e.target.value)}
            />
          </div>
          {search.length > 0 && (
            <div className="flex flex-col gap-5 height-50">
              {roles.map((role, index: number) => (
                <RoleCard key={index} role={role} setCount={setCount} />
              ))}
            </div>
          )}
          <div className="flex flex-col gap-5">
            {roles.map((role, index: number) => (
              <RoleCard key={index} role={role} setCount={setCount} />
            ))}
          </div>
        </div>
        <div className="sidebar__filter__bycountries flex flex-col">
          <div className="region-text">Country</div>
          <div className="region-names flex flex-wrap">
            {isCountriesVisible
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
              onClick={() => setIsCountriesVisible((prev) => !prev)}
            >
              {isCountriesVisible ? (
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
            {isSkillsVisible
              ? data.skills.map((item: string, index: number) => (
                  <RegionCard item={item} key={index} />
                ))
              : data.skills
                  .slice(0, INITIAL_VISIBLE_COUNT)
                  .map((item: string, index: number) => (
                    <RegionCard item={item} key={index} />
                  ))}
            <div
              className="region-hidden flex items-center"
              onClick={() => setIsSkillsVisible((prev) => !prev)}
            >
              {isSkillsVisible ? (
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
                    {data.skills.length - INITIAL_VISIBLE_COUNT}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .sidebar {
          background-color: #ffffff;
          width: 300px;
          height: calc(100vh - 80px);
          position: fixed;
          z-index: 3;
        }
        .gap-10 {
          gap: 8px;
        }
        .sidebar__header {
          height: 60px;
          border-bottom: 0.5px solid rgb(203, 213, 225);
          box-shadow: 0px 0px 4px rgb(224, 224, 224);
          gap: 10px;
        }
        .sidebar__header__text {
          font-weight: 550;
        }
        .sidebar__header__text--clearFilter {
          font-size: 14px;
          color: rgb(21, 111, 248);
          cursor: pointer;
        }
        .height-50 {
          height: 180px;
          overflow-y: auto;
        }
        .header__count {
          height: 20px;
          width: 20px;
          background-color: rgb(21, 111, 247);
          color: white;
          border-radius: 10px;
          font-size: 14px;
        }
        .sidebar__filter {
          padding: 20px 30px;
          gap: 20px;
          overflow-y: scroll;
          height: calc(100dvh - 140px);
        }
        .sidebar__filter__bymember {
          height: 160px;
          width: 100%;
          border-bottom: 0.5px solid rgb(203, 213, 225);
        }
        .sidebar__filter__byregion {
          height: 140px;
          width: 100%;
          gap: 16px;
          border-bottom: 0.5px solid rgb(203, 213, 225);
        }
        .sidebar__filter__bycountries {
          position: relative;
          width: 100%;
          gap: 16px;
          border-bottom: 0.5px solid rgb(203, 213, 225);
        }
        .filter__bymember__option {
          font-size: 14.5px;
          color: rgb(71, 85, 105);
          margin-bottom: 16px;
        }
        .region-text {
          font-size: 14px;
          font-weight: 600;
        }
        ::-webkit-scrollbar {
          width: 6px;
          height: 5px;
        }
        ::-webkit-scrollbar-track {
          box-shadow: inset 0 0 1px rgb(203, 213, 225);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
          background: rgb(203, 213, 225);
          border-radius: 10px;
        }
        .filter__bysearch {
          width: 100%;
          border: 1px solid #e5e7eb;
          height: 40px;
          border-radius: 10px;
          padding: 0 15px;
          gap: 10px;
        }
        :global(.search_input) {
          border: none;
          outline: none;
        }
        .search_icon {
          width: 17px;
          height: 17px;
        }
        .gap-5 {
          gap: 8px;
          margin-bottom: 20px;
        }
        .region-hidden {
          font-size: 12px;
          font-weight: 600;
          gap: 5px;
          margin-top: 10px;
          cursor: pointer;
          margin-bottom: 20px;
        }
        .region-count {
          height: 25px;
          width: 32px;
          border-radius: 10px;
          font-weight: 500;
          border: 1px solid #f1f5f9;
          background-color: #f1f5f9;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
