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
  const [order, setOrder] = useState<string>("Ascending");
  const [isOrder, setIsOrder] = useState<boolean>(false);
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
    const sortMembers = searchParams.get("sortBy") || "";
    return {
      officeHours,
      openToCollaborate,
      friends,
      newMembers,
      searchMembers,
      sortMembers,
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

  const handleSort = (order: string) => {
    setOrder(order);
    currentParams.set("sortBy", order);
    router.push(`?sortBy=${order}`);
  };

  return (
    <div className="p">
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
    </div>
  );
};

export default DisplayMembers;
