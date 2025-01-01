import React, { useState } from "react";
import TextField from "../../ui/textfield/TextField";
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
  const currentRoles = currentParams.get("memberRoles")?.split("|") || [];

  const handleFilterByRole = (
    filter: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = event.target.checked;
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
console.log(searchParams.get("memberRoles")?.split('|'));
  return (
    <div className="card__roleBased">
      <TextField
        type="checkbox"
        className="role-filter__hidden__roles__checkbox"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleFilterByRole(role.role, e)
        }
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
          display: flex;
          align-items: center;
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
