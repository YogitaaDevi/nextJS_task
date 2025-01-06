"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TextField from "../../ui/textfield/TextField";
import { FilterType } from "@/types/filterType";
import { RoleType } from "@/types/roleType";
import { fetchRoles } from "@/service/member.service";
import RegionsAndSkills from "./region-skill-filter/RegionsAndSkills";
import Roles from "./roles/Roles";
import { LocationType } from "@/types/locationType";

interface SidebarProps {
  data: FilterType;
  roleData: RoleType[];
  location: LocationType[];
}

const Sidebar = ({ data, roleData, location }: SidebarProps) => {
  const [count, setCount] = useState<number>(0);
  const [roles, setRoles] = useState<RoleType[]>(roleData);
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams.toString());

  const getRoles = async (value?: string) => {
    let response;
    if (value?.length) response = await fetchRoles(value);
    else response = await fetchRoles();
    setRoles(response);
  };

  const membersRegion = location.map(
    (region: LocationType) => region?.continent
  );
  const membersCountry = location.map(
    (region: LocationType) => region?.country
  );
  const membersMetroArea = location
    .map((region: LocationType) => region?.metroArea)
    .filter((metroArea): metroArea is string => metroArea !== null);

  console.log(membersRegion, membersCountry, membersMetroArea);
  const handleFilterChange = (
    filter: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = event.target.checked;
    console.log(filter);
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
      <div className="sidebar__header">
        <div className="sidebar__header__text">
          <h3 className="sidebar__header__text--filter">Filters</h3>
          {count > 0 && (
            <div className="sidebar__header__text--filter__count">{count}</div>
          )}
        </div>
        <div
          className="sidebar__header__text--clearFilter"
          onClick={handleClearFilters}
        >
          Clear filters
        </div>
      </div>
      <div className="sidebar__body">
        <div className="sidebar__body__filter">
          <div className="sidebar__body__filter__option">
            Only Show Members with Office Hours
            <label className="switch">
              <TextField
                type="checkbox"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleFilterChange("officeHoursOnly", event)
                }
                checked={searchParams.get("officeHoursOnly") === "true"}
              />
            </label>
          </div>
          <div className="sidebar__body__filter__option">
            Open to Collaborate
            <label className="switch">
              <TextField
                type="checkbox"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleFilterChange("openToWork", event)
                }
                checked={searchParams.get("openToWork") === "true"}
              />
            </label>
          </div>
          <div className="sidebar__body__filter__option">
            Include Friends of Protocol Labs
            <label className="switch">
              <TextField
                type="checkbox"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleFilterChange("includeFriends", event)
                }
                checked={searchParams.get("includeFriends") === "true"}
              />
            </label>
          </div>
          <div className="sidebar__body__filter__option">
            New Members
            <label className="switch">
              <TextField
                type="checkbox"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleFilterChange("isRecent", event)
                }
                checked={searchParams.get("isRecent") === "true"}
              />
            </label>
          </div>
        </div>

        <RegionsAndSkills
          data={data.regions}
          location={membersRegion}
          setCount={setCount}
          name="Region"
        />
        <Roles roles={roles} setCount={setCount} getRoles={getRoles} />
        <RegionsAndSkills
          data={data.countries}
          location={membersCountry}
          setCount={setCount}
          name="Country"
        />
        <RegionsAndSkills
          data={data.skills}
          setCount={setCount}
          name="Skills"
        />
        <RegionsAndSkills
          data={data.metroAreas}
          location={membersMetroArea}
          setCount={setCount}
          name="Metro Area"
        />
      </div>
      <style jsx>{`
        .sidebar {
          background-color: #ffffff;
          width: 300px;
          height: calc(100vh - 80px);
          position: fixed;
          z-index: 3;
        }
        .sidebar__header {
          height: 60px;
          border-bottom: 0.5px solid rgb(203, 213, 225);
          box-shadow: 0px 0px 4px rgb(224, 224, 224);
          gap: 10px;
          display: flex;
          align-items: center;
          justify-content: space-around;
        }
        .sidebar__header__text {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .sidebar__header__text--filter {
          font-weight: 550;
        }
        .sidebar__header__text--clearFilter {
          font-size: 14px;
          color: rgb(21, 111, 248);
          cursor: pointer;
        }
        .sidebar__header__text--filter__count {
          height: 20px;
          width: 20px;
          background-color: rgb(21, 111, 247);
          color: white;
          border-radius: 10px;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sidebar__body {
          padding: 20px 30px;
          gap: 20px;
          overflow-y: scroll;
          height: calc(100dvh - 140px);
          display: flex;
          flex-direction: column;
        }
        .sidebar__body__filter {
          height: 160px;
          width: 100%;
          border-bottom: 0.5px solid rgb(203, 213, 225);
          display: flex;
          flex-direction: column;
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
        .sidebar__body__filter__option {
          font-size: 14.5px;
          color: rgb(71, 85, 105);
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
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
      `}</style>
    </div>
  );
};

export default Sidebar;
