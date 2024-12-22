"use client"; // Ensure this is a Client Component
import React, { useState } from "react";
import TextField from "../textfield/TextField";
import { useRouter, useSearchParams } from "next/navigation";

interface MembersFilterProps {
  count: number;
  cardView: string;
  setCardView: (e: any) => void;
}

const MembersFilter = ({
  count,
  cardView,
  setCardView,
}: MembersFilterProps) => {
  const [order, setOrder] = useState<string>("Ascending");
  const [isOrder, setIsOrder] = useState<boolean>(false);
  const [searchBy, setSearchBy] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams.toString());

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchBy) {
      currentParams.set("searchBy", searchBy);
      router.push(`?searchBy=${encodeURIComponent(searchBy)}`);
    }
  };

  const handleClearSearch = () => {
    setSearchBy("");
    currentParams.delete("searchBy");
    router.push("?");
  };

  const handleSort = (order: string) => {
    setOrder(order);
    currentParams.set("sortBy", order);
    router.push(`?sortBy=${order}`);
  };

  return (
    <>
      <div className="layout__membersSide__header">
        <div className="flex gap-20">
          <div className="flex items-baseline gap-7">
            <h1 className="membersSide__header__text">Members</h1>
            <div className="membersSide__header__number">({count})</div>
          </div>
          <div className="membersSide__header__search flex items-center">
            <TextField
              type="text"
              value={searchBy}
              placeholder="Search by Member Name, Team or Project"
              className="search__input"
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
                    ? "search__closeIcon--visible"
                    : "search__closeIcon--hidden"
                }
                onClick={handleClearSearch}
              />
              <img src="/icons/search.svg" alt="Search Icon" />
            </div>
          </div>
          <div className="flex gap-20 justify-between membersSide__header__sort">
            <div className="flex sort__text">
              <p>Sort by: </p>
              <div
                className="relative"
                onClick={() => setIsOrder((prev) => !prev)}
              >
                <div className="sort__order flex items-center justify-between">
                  <img
                    src="/icons/ascending-gray.svg"
                    alt="Sort Ascending"
                    className="sort__order__by"
                  />
                  <p>{order}</p>
                  <img
                    src="/icons/dropdown-gray.svg"
                    alt="Sort Dropdown"
                    className="sort__order__by"
                  />
                  <div
                    className={
                      isOrder
                        ? "sort__order sort__order--visible h-80 flex flex-col"
                        : "sort__order--hidden"
                    }
                  >
                    <div
                      className={
                        order === "Ascending"
                          ? "flex color__active h-40 items-center gap-5"
                          : "flex h-40 items-center gap-5"
                      }
                      onClick={() => handleSort("Ascending")}
                    >
                      <img
                        src="/icons/ascending-gray.svg"
                        alt="Sort Ascending"
                        className="sort__order__by"
                      />
                      <p>Ascending</p>
                    </div>
                    <div
                      className={
                        order === "Descending"
                          ? "flex color__active h-40 items-center gap-5"
                          : "flex h-40 items-center gap-5"
                      }
                      onClick={() => handleSort("Descending")}
                    >
                      <img
                        src="/icons/descending-black.svg"
                        alt="Sort Descending"
                        className="sort__order__by"
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
                  cardView === "List"
                    ? "sort__view__grid flex items-center justify-center"
                    : "sort__view__grid--active sort__view__grid flex items-center justify-center"
                }
              >
                <img
                  src="/icons/grid-selected.svg"
                  alt="Grid View"
                  onClick={() => setCardView("")}
                />
              </div>
              <div
                className={
                  cardView === "List"
                    ? "sort__view__list--active sort__view__list flex items-center justify-center"
                    : "sort__view__list flex items-center justify-center"
                }
              >
                <img
                  src="/icons/list-selected.svg"
                  alt="List View"
                  onClick={() => setCardView("List")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .layout__membersSide__header {
          height: 90px;
          padding: 43px 40px 0px 40px;
          background-color: rgb(241, 245, 249);
          position: fixed;
        }
        .gap-7 {
          gap: 7px;
        }
        .gap-55 {
          gap: 5px;
        }
        .gap-20 {
          gap: 20px;
        }
        .membersSide__header__text {
          font-size: 30px;
        }
        .membersSide__header__number {
          font-size: 14px;
          color: rgb(109, 120, 139);
        }
        .membersSide__header__search {
          width: 340px;
          height: 40px;
          background-color: white;
          gap: 20px;
          padding: 0 12px;
          border-radius: 5px;
          box-shadow: 0px 1px 2px 0px #0f172a29;
        }
        :global(.search__input) {
          border: none;
          outline: none;
          width: 320px;
        }
        .search__closeIcon--hidden {
          display: none;
        }
        .search__closeIcon--visible {
          display: block;
        }
        .sort__text {
          gap: 7px;
          align-items: center;
        }
        .sort__order {
          width: 160px;
          height: 40px;
          padding: 8px 12px;
          border-radius: 8px;
          box-shadow: 0px 1px 2px 0px #0f172a29;
          background-color: white;
          cursor: pointer;
        }
        .sort__order__by {
          width: 20px;
          height: 20px;
        }
        .sort__order p {
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
        .sort__order--hidden {
          display: none;
        }
        .sort__order--visible {
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
