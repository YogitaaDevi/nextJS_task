import React, { useState } from "react";
import TextField from "../textfield/TextField";
import { RoleType } from "@/types/roleType";
import { useRouter, useSearchParams } from "next/navigation";

interface RoleCardProps {
  role: RoleType;
  setCount: (e: any) => void;
}

const RoleCard = ({ role, setCount }: RoleCardProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams.toString());

  const handleFilterByRole = (filter: string, event?: any) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setCount((prev: number) => prev + 1);
      currentParams.set("memberRoles", filter);
    } else {
      setCount((prev: number) => prev - 1);
      currentParams.delete("memberRoles");
    }
    router.push(`?${currentParams.toString()}`);
  };
  return (
    <div className="card__roleBased flex items-center">
      <TextField
        type="checkbox"
        className="card__roleBased__check"
        onChange={() => handleFilterByRole(role.role, event)}
        checked={searchParams.get("memberRoles") === "true"}
      />
      {role.alias ? (
        <>
          <span className="card__roleBased__name">{role.alias}</span>
        </>
      ) : (
        <span className="card__roleBased__name">{role.role}</span>
      )}
      <div className="card__roleBased__count">{role.count}</div>
      <style jsx>{`
        .card__roleBased {
          gap: 10px;
        }
        :global(.card__roleBased__check) {
          appearance: none;
          height: 20px;
          width: 20px;
          border: 1px solid #e5e7eb;
          border-radius: 5px;
        }
        :global(.card__roleBased__check:checked) {
          border: 1px solid #156ff7;
          background-color: #156ff7;
        }
        :global(.card__roleBased__name) {
          font-size: 12px;
          font-weight: 500;
          line-height: 14px;
        }
        :global(.card__roleBased__count) {
          font-weight: 500;
          padding: 0 5px;
          font-size: 10px;
          background-color: #f1f5f9;
        }
      `}</style>
    </div>
  );
};

export default RoleCard;
