"use client";

import { MemberType } from "@/types/memberType";
import MemberGridView from "../card/MemberGridView";
import Loader from "../../ui/loader/Loader";
import useInfinityScroll from "@/hooks/useInfinityScroll";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchMembers } from "@/service/member.service";
import { MemberResponseType } from "@/types/memberResponseType";
import { MemberFilterType } from "@/types/memberFilterType";
import MembersFilter from "../members-filter/MembersFilter";
import NotFound from "../not-found/NotFound";
import MemberListView from "../card/MemberListView";

interface MembersPageProps {
  data: MemberResponseType;
  appliedFilters: MemberFilterType;
}

const MembersPage = ({ data, appliedFilters }: MembersPageProps) => {
  const [currentMembers, setCurrentMembers] = useState<MemberType[]>(
    data.members
  );
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const searchParams = useSearchParams();
  const { observerRef, page, setPage } = useInfinityScroll(hasMore, loading);
  const viewType = searchParams.get("viewType");

  const getMembers = async (pageNo: number) => {
    if (loading) return;
    setLoading(true);
    try {
      const response: MemberResponseType = await fetchMembers(
        appliedFilters,
        page
      );
      if (response.members.length > 0) {
        setCurrentMembers((prev) => [...prev, ...response.members]);
        setCount(response.count);
        if (currentMembers.length + response.members.length >= response.count) {
          setHasMore(false);
        }
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
    setCount(0);
    setHasMore(true);
    setPage(1);
  }, [searchParams]);

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
              <MemberListView key={user.uid} member={user} />
            ))}
          </div>
        ) : (
          <div className="display__members__grid">
            {currentMembers.map((user: MemberType) => (
              <MemberGridView key={user.uid} member={user} />
            ))}
          </div>
        )}
        {!hasMore && currentMembers.length === 0 ? (
          <div className="display__loader">
            <NotFound />
          </div>
        ) : (
          <div ref={observerRef} className="display__loader">
            {hasMore && <Loader />}
          </div>
        )}
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
          margin-top: 20px;
        }
      `}</style>
    </>
  );
};

export default MembersPage;