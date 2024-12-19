"use client";
import { MemberType } from "@/types/memberType";
import Card from "../card/Card";
import Loader from "../loader/Loader";
import useInfinityScroll from "@/hooks/useInfinityScroll";
import "./style.css";
import TextField from "../textfield/TextField";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchMembers } from "@/service/apiService";
import { MemberResponseType } from "@/types/memberResponseType";
import { memberEngagementType } from "@/types/memberEngagementType";
import ListCard from "../card/ListCard";

const DisplayMembers = () => {
  const [currentMembers, setCurrentMembers] = useState<MemberType[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchBy, setSearchBy] = useState<string>("");
  const [count, setCount] = useState<number>(0);
  const [cardView, setCardView] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams.toString());
  let response: MemberResponseType;

  const filterChange = (): memberEngagementType => {
    const officeHours = searchParams.get("OfficeHours") === "true";
    const openToCollaborate = searchParams.get("Collaborate") === "true";
    const friends = searchParams.get("Friends") === "true";
    const newMembers = searchParams.get("NewMembers") === "true";
    const searchMembers = searchParams.get("searchBy") || "";
    return {
      officeHours,
      openToCollaborate,
      friends,
      newMembers,
      searchMembers,
    };
  };

  const getMembers = async (pageNo: number) => {
    if (loading) return;
    setLoading(true);
    try {
      const appliedFilters = filterChange();
      response = await fetchMembers(pageNo, appliedFilters);
      if (response.members) {
        setCurrentMembers((prev) => [...prev, ...response.members]);
        setCount(response.count);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
      setLoading(false);
    }
  };

  const { observerRef, page, setPage } = useInfinityScroll(hasMore, loading);

  useEffect(() => {
    setCurrentMembers([]);
    setHasMore(true);
    setLoading(false);
    setPage(1);
  }, [searchParams]);

  useEffect(() => {
    if (hasMore) getMembers(page);
  }, [page]);

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
  console.log(currentMembers);
  console.log(searchBy);
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
              <div className="sort__order flex items-center justify-between">
                <img
                  src="/icons/ascending-gray.svg"
                  alt="Sort Ascending"
                  className="sort__order__by"
                />
                <p>Ascending</p>
                <img
                  src="/icons/dropdown-gray.svg"
                  alt="Sort Dropdown"
                  className="sort__order__by"
                />
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
      {cardView == "List" ? (
        <div className="display__members__list">
          {currentMembers.map((user: MemberType) => (
            <ListCard key={user.uid} member={user} />
          ))}
        </div>
      ) : (
        <div className="display__members__grid">
          {currentMembers.map((user: MemberType) => (
            <Card key={user.uid} member={user} />
          ))}
        </div>
      )}
      <div
        ref={observerRef}
        className="display__loader flex items-center justify-center"
      >
        {hasMore && <Loader />}
      </div>
    </>
  );
};

export default DisplayMembers;
