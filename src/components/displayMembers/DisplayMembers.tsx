"use client";

import { MemberType } from "@/types/memberType";
import Card from "../card/Card";
import Loader from "../loader/Loader";
import useInfinityScroll from "@/hooks/useInfinityScroll";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchMembers } from "@/service/member.service";
import { MemberResponseType } from "@/types/memberResponseType";
import { MemberFilterType } from "@/types/memberFilterType";
import ListCard from "../card/ListCard";
import MembersFilter from "../membersFilter/MembersFilter";

const DisplayMembers = () => {
  const [currentMembers, setCurrentMembers] = useState<MemberType[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const searchParams = useSearchParams();
  const { observerRef, page, setPage } = useInfinityScroll(hasMore, loading);
  const viewType = searchParams.get("viewType");
  
  const filterChange = (): MemberFilterType => {
    const sortByValue = searchParams.get("sort") || "";
    const [sortField, sortValue] = sortByValue.split(",");
    return {
      officeHoursOnly: searchParams.get("officeHoursOnly") === "true",
      openToWork: searchParams.get("openToWork") === "true",
      includeFriends: searchParams.get("includeFriends") === "true",
      isRecent: searchParams.get("isRecent") === "true",
      searchBy: searchParams.get("searchBy") || "",
      sortField: sortField || "name",
      sortBy: sortValue || "asc",
      memberRoles: searchParams.get("memberRoles")?.split("|") || [],
      skills: searchParams.get("skills")?.split("|") || [],

    };
  };

  const getMembers = async (pageNo: number) => {
    if (loading) return;
    setLoading(true);
    try {
      const appliedFilters = filterChange();
      const response: MemberResponseType = await fetchMembers(
        pageNo,
        appliedFilters
      );
      console.log(appliedFilters.sortBy);
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
  useEffect(() => {
    setCurrentMembers([]);
    setHasMore(true);
    setLoading(false);
    setPage(1);
  }, [searchParams, setPage]);

  useEffect(() => {
    if (hasMore) getMembers(page);
  }, [page]);

  return (
    <>
      <MembersFilter count={count} />
      <div className="display__members">
        {viewType === "List" ? (
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
        <div ref={observerRef} className="display__loader">
          {hasMore && <Loader />}
        </div>
      </div>
      <style jsx>{`
        .display__members {
          padding: 0 50px;
          margin-top: 10px;
          width: 100%;
        }
        .display__members__grid {
          margin-top: 100px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .display__members__list {
          margin-top: 100px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .display__loader {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </>
  );
};

export default DisplayMembers;
