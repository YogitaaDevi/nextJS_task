import RoleCard from "@/components/page/card/RoleCard";
import TextField from "@/components/ui/textfield/TextField";
import { RoleType } from "@/types/roleType";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
interface RolesProps {
  roles: RoleType[];
  setCount: (e: any) => void;
  getRoles: (value?: string) => void;
}
const Roles = ({ roles, setCount, getRoles }: RolesProps) => {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>("");

  const handleSearch = (value: string) => {
    getRoles(value);
    setSearch(value);
  };

  return (
    <div className="role-filter">
      <div className="role-filter__heading">Roles</div>
      <div className="role-filter__search">
        <img
          src="/icons/search-gray.svg"
          alt=""
          className="role-filter__search__icon"
        />
        <TextField
          type="text"
          value={search}
          className="role-filter__search__input"
          placeholder="Search Role [eg. Engineer]"
          onChange={(e: any) => handleSearch(e.target.value)}
        />
      </div>
      {search.length > 0 ? (
        <div className="role-filter__hidden">
          <div className="role-filter__hidden__roles">
            <TextField
              type="checkbox"
              className="role-filter__hidden__roles__checkbox"
              checked={searchParams.get("memberRoles") === "true"}
            />
            <span className="card__roleBased__name">Select All</span>
          </div>
          {roles.map((role, index: number) => (
            <RoleCard key={index} role={role} setCount={setCount} />
          ))}
        </div>
      ) : (
        <div className="role-filter__roles">
          {roles.map((role, index: number) => (
            <RoleCard key={index} role={role} setCount={setCount} />
          ))}
        </div>
      )}
      <style jsx>{`
        .role-filter {
          position: relative;
          width: 100%;
          gap: 16px;
          border-bottom: 0.5px solid rgb(203, 213, 225);
          display: flex;
          flex-direction: column;
        }
        .role-filter__heading {
          font-size: 14px;
          font-weight: 600;
        }
        .role-filter__search {
          width: 100%;
          border: 1px solid #e5e7eb;
          height: 40px;
          border-radius: 10px;
          padding: 0 15px;
          gap: 10px;
          display: flex;
          align-items: center;
        }
        :global(.role-filter__search__input) {
          border: none;
          outline: none;
        }
        .role-filter__search__icon {
          width: 17px;
          height: 17px;
        }
        .role-filter__hidden,
        .role-filter__roles {
          gap: 8px;
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
        }
        .role-filter__hidden__roles {
          display: flex;
          align-items: center;
        }
        :global(.role-filter__hidden__roles__checkbox) {
          appearance: none;
          height: 20px;
          width: 20px;
          border: 1px solid #e5e7eb;
          border-radius: 5px;
        }
        :global(.role-filter__hidden__roles__checkbox:checked) {
          border: 1px solid #156ff7;
          background-color: #156ff7;
        }
      `}</style>
    </div>
  );
};
export default Roles;
