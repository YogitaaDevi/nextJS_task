"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TextField from "../textfield/TextField";
import { FilterType } from "@/types/filterType";
import { RoleType } from "@/types/roleType";
import { fetchRoles } from "@/service/member.service";
import Skills from "./skills/Skills";
import MetroAreas from "./metro-areas/MetroAreas";
import Regions from "./regions/Regions";
import Roles from "./roles/Roles";
import Countries from "./countries/Countries";

interface SidebarProps {
  data: FilterType;
}

const Sidebar = ({ data }: SidebarProps) => {
  const [count, setCount] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [roles, setRoles] = useState<RoleType[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams.toString());

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
                onChange={() => handleFilterChange("officeHoursOnly", event)}
                checked={searchParams.get("officeHoursOnly") === "true"}
              />
            </label>
          </div>
          <div className="filter__bymember__option flex items-center justify-between">
            Open to Collaborate
            <label className="switch">
              <TextField
                type="checkbox"
                onChange={() => handleFilterChange("openToWork", event)}
                checked={searchParams.get("openToWork") === "true"}
              />
            </label>
          </div>
          <div className="filter__bymember__option flex items-center justify-between">
            Include Friends of Protocol Labs
            <label className="switch">
              <TextField
                type="checkbox"
                onChange={() => handleFilterChange("includeFriends", event)}
                checked={searchParams.get("includeFriends") === "true"}
              />
            </label>
          </div>
          <div className="filter__bymember__option flex items-center justify-between">
            New Members
            <label className="switch">
              <TextField
                type="checkbox"
                onChange={() => handleFilterChange("isRecent", event)}
                checked={searchParams.get("isRecent") === "true"}
              />
            </label>
          </div>
        </div>
        <Regions data={data} />
        <Roles
          roles={roles}
          setCount={setCount}
          search={search}
          setSearch={setSearch}
        />
        <Countries data={data} />
        <Skills data={data} setCount={setCount} />
        <MetroAreas data={data} />
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
