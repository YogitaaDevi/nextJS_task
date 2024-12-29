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
    setSearchBy((prev) => prev = "" );
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
      <div className="memberside">
        <div className="flex gap-20 memberside__header">
          <div className="flex items-baseline gap-7">
            <h1 className="memberside__header__text">Members</h1>
            <div className="memberside__header__count">({count})</div>
          </div>
          <div className="memberside__header__search flex items-center">
            <TextField
              type="text"
              value={searchBy}
              placeholder="Search by Member Name, Team or Project"
              className="header__search__input"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchBy(e.target.value)
              }
              onKeyDown={handleSearch}
            />
            <div className="flex gap-55">
              <img
                src="/icons/close-gray.svg"
                alt="Close Icon"
                className={
                  searchBy.length > 0
                    ? "header__search__closeIcon--visible"
                    : "header__search__closeIcon--hidden"
                }
                onClick={handleClearSearch}
              />
              <img src="/icons/search.svg" alt="Search Icon" />
            </div>
          </div>
          <div className="flex gap-20 justify-between memberside__header__sort">
            <div className="flex header__sort__view">
              Sort by:
              <div
                className="relative"
                onClick={() => setIsOrder((prev) => !prev)}
              >
                <div className="sort__view__order flex items-center justify-between font-14">
                  <img
                    src={
                      order === "Descending"
                        ? "/icons/descending-black.svg"
                        : "/icons/ascending-gray.svg"
                    }
                    alt="Sort order"
                    className="view__order__type"
                  />
                  <p>{order}</p>
                  <img
                    src="/icons/dropdown-gray.svg"
                    alt="Sort Dropdown"
                    className="view__order__type"
                  />
                  <div
                    className={
                      isOrder
                        ? "sort__view__order sort__view__order--visible h-80 flex flex-col"
                        : "sort__view__order--hidden"
                    }
                  >
                    <div
                      className={
                        order === "Descending"
                          ? "flex h-40 items-center gap-5 font-14"
                          : "flex color__active h-40 items-center gap-5 font-14"
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
                        className="view__order__type"
                      />
                      <p>Ascending</p>
                    </div>
                    <div
                      className={
                        order === "Descending"
                          ? "flex color__active h-40 items-center gap-5 font-14"
                          : "flex h-40 items-center gap-5 font-14"
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
                        className="view__order__type"
                      />
                      <p>Descending</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="sort__view flex">
              <div
                className={
                  viewType === "List"
                    ? "sort__view__grid flex items-center justify-center"
                    : "sort__view__grid--active sort__view__grid flex items-center justify-center"
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
                    ? "sort__view__list--active sort__view__list flex items-center justify-center"
                    : "sort__view__list flex items-center justify-center"
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
        .memberside {
          height: 90px;
          padding: 43px 40px 0px 40px;
          background-color: rgb(241, 245, 249);
          position: fixed;
        }
        .gap-7 {
          gap: 7px;
        }
        .gap-5 {
          gap: 5px;
        }
        .gap-20 {
          gap: 20px;
        }
        .font-14 {
          font-size: 14px;
        }
        .memberside__header__text {
          font-size: 30px;
        }
        .memberside__header__count {
          font-size: 14px;
          color: rgb(109, 120, 139);
        }
        .memberside__header__search {
          width: 340px;
          height: 40px;
          background-color: white;
          gap: 20px;
          padding: 0 12px;
          border-radius: 5px;
          box-shadow: 0px 1px 2px 0px #0f172a29;
        }
        :global(.header__search__input) {
          border: none;
          outline: none;
          width: 320px;
        }
        .header__search__closeIcon--hidden {
          display: none;
        }
        .header__search__closeIcon--visible {
          display: block;
        }
        .header__sort__view {
          gap: 7px;
          align-items: center;
        }
        .sort__view__order {
          width: 160px;
          height: 40px;
          padding: 8px 12px;
          border-radius: 8px;
          box-shadow: 0px 1px 2px 0px #0f172a29;
          background-color: white;
          cursor: pointer;
        }
        .view__order__type {
          width: 20px;
          height: 20px;
        }
        sort__view__order p {
          font-size: 14px;
        }
        .sort__view {
          width: 80px;
          height: 40px;
          background-color: white;
          border-radius: 10px;
          box-shadow: 0px 1px 2px 0px #0f172a29;
        }
        .sort__view__grid {
          width: 50%;
          height: 100%;
        }
        .sort__view__grid:hover {
          border-radius: 10px 0 0 10px;
          border: 2px solid rgb(131, 175, 246);
        }
        .sort__view__grid--active {
          background-color: rgb(219, 234, 254);
          border-radius: 10px 0 0 10px;
        }
        .sort__view__list {
          width: 50%;
          height: 100%;
        }
        .sort__view__list:hover {
          border-radius: 0 10px 10px 0;
          border: 2px solid rgb(131, 175, 246);
        }
        .sort__view__list--active {
          background-color: rgb(219, 234, 254);
          border-radius: 0 10px 10px 0;
        }
        .h-80 {
          height: 90px;
        }
        .sort__view__order--hidden {
          display: none;
        }
        .sort__view__order--visible {
          display: flex;
          position: absolute;
          top: 50px;
          left: 0;
          padding: 8px;
        }
        .relative {
          position: relative;
        }
        .color__active {
          background-color: rgb(21, 111, 247);
          color: white;
          border-radius: 5px;
        }
        .h-40 {
          height: 40px;
          padding: 5px;
        }
      `}</style>
    </>
  );
};

export default MembersFilter;
