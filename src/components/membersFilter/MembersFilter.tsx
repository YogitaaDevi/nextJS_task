'use client'
import React, { useState } from "react";
import TextField from "../textfield/TextField";
import { useRouter, useSearchParams } from "next/navigation";
import './style.css'

const MembersFilter = () => {
  const [count, setCount] = useState<number>(0);
  const [cardView, setCardView] = useState<string>("");
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
          <div className="flex gap-5">
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
                        : "flex h-40 items-center gap-5`"
                    }
                    onClick={() => handleSort("Descending")}
                  >
                    <img
                      src="/icons/descending-black.svg"
                      alt="Sort Ascending"
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
  );
};

export default MembersFilter;
