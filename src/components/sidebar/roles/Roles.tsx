import RoleCard from "@/components/card/RoleCard";
import TextField from "@/components/textfield/TextField";
import { RoleType } from "@/types/roleType";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface RolesProps {
  roles: RoleType[];
  setCount: (e: any) => void;
  search: string;
  setSearch: (e: any) => void;
}

const Roles = ({ roles, setCount, search, setSearch }: RolesProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams.toString());
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  useEffect(() => {
    const currentRoles = searchParams.get("memberRoles")?.split("|") || [];
    setSelectedRoles(currentRoles);
    setSelectAll(currentRoles.length === roles.length);
  }, [searchParams, roles]);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      const allRoles = roles.map((role) => role.role);
      currentParams.set("memberRoles", allRoles.join("|"));
      setSelectedRoles(allRoles);
    } else {
      currentParams.delete("memberRoles");
      setSelectedRoles([]);
    }
    router.push(`?${currentParams.toString()}`);
    setSelectAll(isChecked);
  };

  const handleRoleSelect = (role: string, isChecked: boolean) => {
    const updatedRoles = isChecked
      ? [...selectedRoles, role]
      : selectedRoles.filter((r) => r !== role);

    setSelectedRoles(updatedRoles);
    setSelectAll(updatedRoles.length === roles.length);

    if (updatedRoles.length > 0) {
      currentParams.set("memberRoles", updatedRoles.join("|"));
    } else {
      currentParams.delete("memberRoles");
    }
    router.push(`?${currentParams.toString()}`);
  };

  return (
    <div className="sidebar__filter__bycountries flex flex-col">
      <div className="region-text">Roles</div>
      <div className="filter__bysearch flex items-center">
        <img src="/icons/search-gray.svg" alt="" className="search_icon" />
        <TextField
          type="text"
          value={search}
          className="search_input"
          placeholder="Search Role [eg. Engineer]"
          onChange={(e: any) => setSearch(e.target.value)}
        />
      </div>
      {search.length > 0 && (
        <div className="flex flex-col gap-5 height-50">
          <div className="card__roleBased flex items-center">
            <TextField
              type="checkbox"
              className="card__roleBased__check"
              checked={selectAll}
              onChange={handleSelectAll}
            />
            <span className="card__roleBased__name">Select All</span>
          </div>
          {roles.map((role, index: number) => (
            <RoleCard
              key={index}
              role={role}
              setCount={setCount}
              isSelected={selectedRoles.includes(role.role)}
              onRoleSelect={handleRoleSelect}
            />
          ))}
        </div>
      )}
      <div className="flex flex-col gap-5">
        {roles.map((role, index: number) => (
          <RoleCard
            key={index}
            role={role}
            setCount={setCount}
            isSelected={selectedRoles.includes(role.role)}
            onRoleSelect={handleRoleSelect}
          />
        ))}
      </div>
      <style jsx>{`
        .sidebar__filter__bycountries {
          position: relative;
          width: 100%;
          gap: 16px;
          border-bottom: 0.5px solid rgb(203, 213, 225);
        }
        .region-text {
          font-size: 14px;
          font-weight: 600;
        }
        .filter__bysearch {
          width: 100%;
          border: 1px solid #e5e7eb;
          height: 40px;
          border-radius: 10px;
          padding: 0 15px;
          gap: 10px;
        }
        :global(.search_input) {
          border: none;
          outline: none;
        }
        .search_icon {
          width: 17px;
          height: 17px;
        }
        .gap-5 {
          gap: 8px;
          margin-bottom: 20px;
        }
        .region-hidden {
          font-size: 12px;
          font-weight: 600;
          gap: 5px;
          margin-top: 10px;
          cursor: pointer;
          margin-bottom: 20px;
        }
        .region-count {
          height: 25px;
          width: 32px;
          border-radius: 10px;
          font-weight: 500;
          border: 1px solid #f1f5f9;
          background-color: #f1f5f9;
        }
      `}</style>
    </div>
  );
};

export default Roles;
