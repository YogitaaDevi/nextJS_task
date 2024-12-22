import React from "react";
import TextField from "../textfield/TextField";
import { RoleType } from "@/types/roleType";

interface RoleCardProps {
  role: RoleType;
}

const RoleCard = ({ role }: RoleCardProps) => {
  return (
    <div className="role-card flex items-center">
      <TextField type="checkbox" className="searc_check" />
      {role.alias ? (
        <span className="text">{role.alias}</span>
      ) : (
        <span className="text">{role.role}</span>
      )}
      <div className="count">{role.count}</div>
      <style jsx>{`
        .role-card {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .searc_check {
          appearance: none;
          height: 20px;
          width: 20px;
          border: 1px solid #e5e7eb;
          border-radius: 5px;
        }
        .searc_check:checked {
          border: 1px solid #156ff7;
          background-color: #156ff7;
        }
        .text {
          font-size: 12px;
          font-weight: 500;
          line-height: 14px;
        }
        .count {
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