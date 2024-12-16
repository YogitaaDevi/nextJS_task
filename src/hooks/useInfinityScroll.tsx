import { fetchMembers } from "@/service/apiService";
import { MemberType } from "@/types/memberType";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const useInfinityScroll = () => {
  const [currentMembers, setcurrentMembers] = useState<MemberType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const fetchingRef = useRef(false);
  const searchParams = useSearchParams();

  const filterChange = () => {
    const officeHours = searchParams.get("OfficeHours") === "true";
    const openToCollaborate = searchParams.get("Collaborate") === "true";
    const friends = searchParams.get("Friends") === "true";
    const newMembers = searchParams.get("NewMembers") === "true";
    return {
      officeHours,
      openToCollaborate,
      friends,
      newMembers,
    };
  };
  const getMembers = async (pageNo: number): Promise<MemberType[] | null> => {
    try {
      const appliedFilters = filterChange();
      const response: MemberType[] = await fetchMembers(pageNo, appliedFilters);
      return response;
    } catch (error) {
      return null;
    }
  };

  const loadMore = async () => {
    if (fetchingRef.current || !hasMore) return;
    fetchingRef.current = true;
    const newMembers = await getMembers(page);
    if (!newMembers || !Array.isArray(newMembers)) {
      setHasMore(false);
    } else {
      setcurrentMembers((prev) => [...prev, ...newMembers]);
      setPage((prev) => prev + 1);
    }
    fetchingRef.current = false;
  };

  useEffect(() => {
    setcurrentMembers([]);
    setPage(1);
    setHasMore(true);
  }, [searchParams]);

  useEffect(() => {
    if (currentMembers.length === 0) {
      loadMore();
    }
  }, [page, searchParams]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      },
      { root: null, rootMargin: "0px", threshold: 1.0 }
    );

    const currentObserverRef = observerRef.current;
    if (currentObserverRef) observer.observe(currentObserverRef);
    return () => {
      if (currentObserverRef) observer.unobserve(currentObserverRef);
    };
  }, [loadMore, hasMore]);
  console.log(currentMembers)
  return {currentMembers, hasMore, observerRef};
};

export default useInfinityScroll;