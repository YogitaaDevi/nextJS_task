let selectedRoles: string[] = [];
let updatedRoles: string[] = [];

import React from "react";
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
    name: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (selectedRoles.includes(name)) {
      updatedRoles.splice(updatedRoles.indexOf(name), 1);
      selectedRoles.splice(selectedRoles.indexOf(name), 1);
      currentParams.set("memberRoles", updatedRoles.join("|"));
      setCount((prev: number) => prev - 1);
    } else {
      selectedRoles.push(name);
      updatedRoles = [...currentRoles, ...selectedRoles];
      currentParams.set("memberRoles", updatedRoles.join("|"));
      setCount((prev: number) => prev + 1);
    }
    if (updatedRoles.length === 0) {
      currentParams.delete("memberRoles");
    }
    router.push(`?${currentParams.toString()}`);
  };
  return (
    <div className="card__roleBased">
      <TextField
        type="checkbox"
        className="role-filter__hidden__roles__checkbox"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleFilterByRole(role.role, e)
        }
        checked={currentRoles.includes(role.role)}
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
