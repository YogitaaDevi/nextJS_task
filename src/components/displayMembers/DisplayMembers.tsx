"use client";
import { MemberType } from "@/types/memberType";
import Card from "../card/Card";
import Loader from "../loader/Loader";
import useInfinityScroll from "@/hooks/useInfinityScroll";
import "./style.css";
import TextField from "../textfield/TextField";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchMembers } from "@/service/apiService";
import { MemberResponseType } from "@/types/memberResponseType";

const DisplayMembers = () => {
  const [currentMembers, setCurrentMembers] = useState<MemberType[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const searchParams = useSearchParams();
  let response: MemberResponseType;

  const filterChange = () => {
    const officeHours = searchParams.get("OfficeHours") === "true";
    const openToCollaborate = searchParams.get("Collaborate") === "true";
    const friends = searchParams.get("Friends") === "true";
    const newMembers = searchParams.get("NewMembers") === "true";
    const region = searchParams.get("region");
    return {
      officeHours,
      openToCollaborate,
      friends,
      newMembers,
      region,
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

  return (
    <>
      <div className="layout__membersSide__header">
        <div className="flex gap-20">
          <div className="flex items-baseline gap-7">
            <h2 className="membersSide__header__text">Members</h2>
            <div className="membersSide__header__number">({count})</div>
          </div>
          <div className="membersSide__header__search flex items-center">
            <TextField
              type="text"
              placeholder="Search by MemberName, Team or Project"
              className="search__input"
            />
            <img src="/icons/search.svg" alt="Search Icon" />
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
              <div className="sort__view__type border-right flex items-center justify-center">
                <img src="/icons/grid-selected.svg" alt="Grid View" />
              </div>
              <div className="sort__view__type flex items-center justify-center">
                <img src="/icons/list-selected.svg" alt="List View" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="display__members">
        {currentMembers.length > 0 &&
          currentMembers.map((user: MemberType) => (
            <Card key={user.uid} member={user} />
          ))}
      </div>
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
