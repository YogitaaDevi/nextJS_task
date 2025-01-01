"use client";

import React, { useState } from "react";
import TextField from "../../ui/textfield/TextField";
import { useRouter, useSearchParams } from "next/navigation";

interface MembersFilterProps {
  count: number;
}

const MembersFilter = ({ count }: MembersFilterProps) => {
  const [isOrder, setIsOrder] = useState<boolean>(false);
  const [searchBy, setSearchBy] = useState<string>("");
  const [order, setOrder] = useState<string>("Ascending");
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams.toString());
  const viewType = searchParams.get("viewType");

  const handleClearSearch = () => {
    setSearchBy((prev) => (prev = ""));
    currentParams.delete("searchBy");
    router.push("?");
  };

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchBy.length > 0) {
      currentParams.set("searchBy", searchBy);
      router.push(`?searchBy=${encodeURIComponent(searchBy)}`);
    } else if (event.key === "Enter") {
      handleClearSearch();
    }
  };

  const handleCardView = (value: string) => {
    currentParams.set("viewType", value);
    router.push(`?viewType=${value}`);
  };
  const handleSort = (direction: string) => {
    const sortField = "Name";
    const sortValue = `${sortField},${direction}`;
    currentParams.set("sort", sortValue);
    if (direction === "desc") setOrder("Descending");
    else setOrder("Ascending");
    router.push(`?${currentParams.toString()}`);
  };

  return (
    <>
      <div className="member-view">
        <div className="member-view__header">
          <div className=" member-view__header__left">
            <h1 className="member-view__header__left__text">Members</h1>
            <div className="member-view__header__left__count">({count})</div>
          </div>
          <div className="member-view__header__middle">
            <TextField
              type="text"
              value={searchBy}
              placeholder="Search by Member Name, Team or Project"
              className="member-view__header__middle__search-input"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchBy(e.target.value)
              }
              onKeyDown={handleSearch}
            />
            <div className="member-view__header__middle__search-closeIcon">
              <img
                src="/icons/close-gray.svg"
                alt="Close Icon"
                className={
                  searchBy.length > 0
                    ? "member-view__header__middle__search-closeIcon--visible"
                    : "member-view__header__middle__search-closeIcon--hidden"
                }
                onClick={handleClearSearch}
              />
              <img src="/icons/search.svg" alt="Search Icon" />
            </div>
          </div>
          <div className="member-view__header__right">
            <div className="flex member-view__header__right__text">
              Sort by:
              <div
                className="member-view__header__right__sort"
                onClick={() => setIsOrder((prev) => !prev)}
              >
                <div className="header__right__sort__order">
                  <img
                    src={
                      order === "Descending"
                        ? "/icons/descending-black.svg"
                        : "/icons/ascending-gray.svg"
                    }
                    alt="Sort order"
                    className="sort__order__type"
                  />
                  <p>{order}</p>
                  <img
                    src="/icons/dropdown-gray.svg"
                    alt="Sort Dropdown"
                    className="sort__order__type"
                  />
                  <div
                    className={
                      isOrder
                        ? "header__right__sort__order--visible"
                        : "header__right__sort__order--hidden"
                    }
                  >
                    <div
                      className={
                        order === "Descending"
                          ? "sort__order__visible--inactive"
                          : "sort__order__visible--active"
                      }
                      onClick={() => handleSort("asc")}
                    >
                      <img
                        src={
                          order === "Descending"
                            ? "/icons/ascending-gray.svg"
                            : "/icons/ascending-selected.svg"
                        }
                        alt="Sort Ascending"
                        className="sort__order__type"
                      />
                      <p>Ascending</p>
                    </div>
                    <div
                      className={
                        order === "Descending"
                          ? "sort__order__visible--active"
                          : "sort__order__visible--inactive"
                      }
                      onClick={() => handleSort("desc")}
                    >
                      <img
                        src={
                          order === "Descending"
                            ? "/icons/descending-selected.svg"
                            : "/icons/descending-black.svg"
                        }
                        alt="Sort Descending"
                        className="sort__order__type"
                      />
                      <p>Descending</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="member-view__header__right__view-type">
              <div
                className={
                  viewType === "List"
                    ? "view-type__grid"
                    : "view-type__grid--active"
                }
              >
                <img
                  src="/icons/grid-selected.svg"
                  alt="Grid View"
                  onClick={() => handleCardView("Grid")}
                />
              </div>
              <div
                className={
                  viewType === "List"
                    ? "view-type__list--active"
                    : "view-type__list"
                }
              >
                <img
                  src="/icons/list-selected.svg"
                  alt="List View"
                  onClick={() => handleCardView("List")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .member-view {
          height: 90px;
          padding: 43px 40px 0px 40px;
          background-color: rgb(241, 245, 249);
          position: fixed;
        }
        .member-view__header {
          gap: 20px;
          display: flex;
        }
        .member-view__header__left {
          gap: 7px;
          display: flex;
          align-items: baseline;
        }
        .member-view__header__right {
          display: flex;
          justify-content: space-between;
        }
        .member-view__header__left__text {
          font-size: 30px;
        }
        .member-view__header__left__count {
          font-size: 14px;
          color: rgb(109, 120, 139);
        }
        .member-view__header__middle {
          width: 340px;
          height: 40px;
          background-color: white;
          gap: 20px;
          padding: 0 12px;
          border-radius: 5px;
          box-shadow: 0px 1px 2px 0px #0f172a29;
          display: flex;
          align-items: center;
        }
        :global(.member-view__header__middle__search-input) {
          border: none;
          outline: none;
          width: 320px;
        }
        .member-view__header__middle__search-closeIcon {
          display: flex;
        }
        .member-view__header__middle__search-closeIcon--hidden {
          display: none;
        }
        .member-view__header__middle__search-closeIcon--visible {
          display: block;
        }
        .member-view__header__right__text {
          gap: 7px;
          align-items: center;
          display: flex;
        }
        .header__right__sort__order,
        .header__right__sort__order--visible {
          width: 160px;
          height: 40px;
          padding: 8px 12px;
          border-radius: 8px;
          box-shadow: 0px 1px 2px 0px #0f172a29;
          background-color: white;
          cursor: pointer;
          font-size: 14px;
          align-items: center;
          display: flex;
          justify-content: space-between;
        }
        .sort__order__type {
          width: 20px;
          height: 20px;
        }
        header__right__sort__order p {
          font-size: 14px;
        }
        .sort__order__visible--active,
        .sort__order__visible--inactive {
          align-items: center;
          display: flex;
          height: 40px;
          padding: 5px;
          gap: 5px;
          font-size: 14px;
        }
        .sort__order__visible--inactive {
          background-color: rgb(21, 111, 247);
          color: white;
          border-radius: 5px;
        }
        .member-view__header__right__view-type {
          width: 80px;
          height: 40px;
          background-color: white;
          border-radius: 10px;
          box-shadow: 0px 1px 2px 0px #0f172a29;
          display: flex;
        }
        .view-type__grid,
        .view-type__grid--active {
          width: 50%;
          height: 100%;
          align-items: center;
          justify-content: center;
          display: flex;
        }
        .view-type__grid:hover,
        .view-type__grid--active:hover {
          border-radius: 10px 0 0 10px;
          border: 2px solid rgb(131, 175, 246);
        }
        .view-type__grid--active {
          background-color: rgb(219, 234, 254);
          border-radius: 10px 0 0 10px;
        }
        .view-type__list,
        .view-type__list--active {
          width: 50%;
          align-items: center;
          justify-content: center;
          display: flex;
          height: 100%;
        }
        .view-type__list:hover,
        .view-type__list--active:hover {
          border-radius: 0 10px 10px 0;
          border: 2px solid rgb(131, 175, 246);
        }
        .view-type__list--active {
          background-color: rgb(219, 234, 254);
          border-radius: 0 10px 10px 0;
        }
        .header__right__sort__order--hidden {
          display: none;
        }
        .header__right__sort__order--visible {
          display: flex;
          flex-direction: column;
          position: absolute;
          top: 50px;
          left: 0;
          padding: 8px;
          height: 90px;
        }
        .member-view__header__right__sort {
          position: relative;
        }
        .color__active {
          background-color: rgb(21, 111, 247);
          color: white;
          border-radius: 5px;
        }
      `}</style>
    </>
  );
};

export default MembersFilter;
