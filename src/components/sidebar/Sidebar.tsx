"use client";
import React from "react";
import "./style.css";
import { useRouter, useSearchParams } from "next/navigation";
import TextField from "../textfield/TextField";

const Sidebar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (filter: string, event: any) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    const isChecked = event.target.checked;
    if (isChecked) currentParams.set(filter, "true");
    else currentParams.delete(filter);
    router.push(`?${currentParams.toString()}`);
  };

  return (
    <div className="sidebar">
      <div className="flex items-center justify-around sidebar__header">
        <h3 className="sidebar__header__text">Filters</h3>
        <div className="sidebar__header__text--clearFilter">Clear filters</div>
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
          <div className="region-names flex flex-wrap"></div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
