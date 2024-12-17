"use client";
import { MemberType } from "@/types/memberType";
import Card from "../card/Card";
import useInfinityScroll from "@/hooks/useInfinityScroll";
import Loader from "../loader/Loader";
import "./style.css";

const DisplayMembers = () => {
  const { currentMembers, observerRef, hasMore } = useInfinityScroll();

  return (
    <>
      <div className="display__members">
        {currentMembers.length > 0 &&
          currentMembers.map((member: MemberType) => (
            <Card key={member.uid} member={member} />
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
