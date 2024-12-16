"use client";
import { MemberType } from "@/types/memberType";
import Card from "../card/Card";
import useInfinityScroll from "@/hooks/useInfinityScroll";

const DisplayMembers = () => {
  const { currentMembers, observerRef, hasMore } = useInfinityScroll();

  return (
    <>
      {currentMembers.length > 0 ? (
        currentMembers.map((member: MemberType) => (
          <Card key={member.uid} member={member} />
        ))
      ) : (
        <p>No members found.</p>
      )}
      <div ref={observerRef} style={{ height: "20px", margin: "10px 0" }}>
        {hasMore && <p>Loading more members...</p>}
      </div>
    </>
  );
};

export default DisplayMembers;
