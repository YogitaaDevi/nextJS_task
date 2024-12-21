import React from "react";
import TextField from "../textfield/TextField";
import "./style.css";
import { RoleType } from "@/types/roleType";

interface RoleCardProps {
  role: RoleType;
}

const RoleCard = ({ role }: RoleCardProps) => {
  return (
    <div className="flex items-center gap-10">
      <TextField type="checkbox" className="searc_check" />
      {role.alias ? (
        <span className="text">{role.alias}</span>
      ) : (
        <span className="text">{role.role}</span>
      )}
      <div className="count">{role.count}</div>
    </div>
  );
};

export default RoleCard;
