import React, { useState } from "react";
import TextField from "../textfield/TextField";
import { RoleType } from "@/types/roleType";
import { useRouter, useSearchParams } from "next/navigation";

interface RoleCardProps {
  role: RoleType;
  setCount: (e: any) => void;
  isSelected: boolean;
  onRoleSelect: (role: string, isChecked: boolean) => void;
}

const RoleCard = ({ role, setCount }: RoleCardProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams.toString());

  const handleFilterByRole = (filter: string, event?: any) => {
    const isChecked = event.target.checked;
    const currentRoles = searchParams.get("memberRoles")?.split("|") || [];
    if (isChecked) {
      if (!currentRoles.includes(filter)) {
        currentRoles.push(filter);
      }
      setCount((prev: number) => prev + 1);
    } else {
      const updatedRoles = currentRoles.filter((role) => role !== filter);
      currentRoles.length = 0;
      currentRoles.push(...updatedRoles);
      setCount((prev: number) => prev - 1);
    }
    if (currentRoles.length > 0) {
      currentParams.set("memberRoles", currentRoles.join("|"));
    } else {
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
        checked={searchParams
          .get("memberRoles")
          ?.split("|")
          .includes(role.role)}
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
        :global(.card__roleBased) {
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
