import React from "react";
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import "./style.css";
import TextField from "@/components/textfield/TextField";
import DisplayMembers from "@/components/displayMembers/DisplayMembers";
import { fetchFilters, fetchMembers } from "@/service/apiService";

const page = async () => {
  const regions = await fetchFilters();
  // const member
  return (
    <>
      <Header />
      <div className="flex main__layout">
        <Sidebar data={regions} />
        <div className="flex flex-col main__layout__membersSide">
          {/* <div className="layout__membersSide__header">
            <div className="flex gap-20">
              <div className="flex items-baseline gap-7">
                <h2 className="membersSide__header__text">Members</h2>
                <div className="membersSide__header__number">(1366)</div>
              </div>
              <div className="membersSide__header__search flex items-center">
                <TextField
                  type="text"
                  placeholder="Search by MemberName, Team or Project"
                  className="search__input"
                />
                <img src="/icons/search.svg" alt="" />
              </div>
              <div className="flex gap-20 justify-between membersSide__header__sort">
                <div className="flex sort__text">
                  <p>Sort by: </p>
                  <div className="sort__order flex items-center justify-between">
                    <img
                      src="/icons/ascending-gray.svg"
                      alt=""
                      className="sort__order__by"
                    />
                    <p>Ascending</p>
                    <img
                      src="/icons/dropdown-gray.svg"
                      alt=""
                      className="sort__order__by"
                    />
                  </div>
                </div>
                <div className="sort__view flex ">
                  <div className="sort__view__type border-right flex items-center justify-center">
                    <img src="/icons/grid-selected.svg" alt="" />
                  </div>
                  <div className="sort__view__type flex items-center justify-center">
                    <img src="/icons/list-selected.svg" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <DisplayMembers />
        </div>
      </div>
    </>
  );
};

export default page;
