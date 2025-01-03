import React from "react";
import Button from "../../ui/button/Button";
import { SkillType } from "@/types/skillType";

interface SkillCardProps {
  item?: SkillType;
  count?: number;
}

const MemberSkills = ({ item, count }: SkillCardProps) => {
  const truncateSkill = (text: string): string => {
    if (text.length > 5) {
      return `${text.slice(0, 5)}...`;
    }
    return text;
  };
  return (
    <>
      {item && (
        <Button
          className="memberskill__filter"
          name={truncateSkill(item.title)}
        />
      )}
      {count && <span className="memberskill__filter">+ {count}</span>}
      <style jsx>{`
        :global(.memberskill__filter) {
          gap: 20px;
          background-color: rgb(241, 245, 249);
          height: 25px;
          line-height: 20px;
          padding: 3px 10px;
          border-radius: 50px;
          font-size: 12px;
          border: 1px solid rgb(203, 213, 225);
          margin-right: 5px;
          margin-bottom: 8px;
          background-color: white;
          color: rgb(108, 123, 145);
          cursor: pointer;
          background-color: rgb(241, 245, 249);
          border: none;
        }
      `}</style>
    </>
  );
};

export default MemberSkills;
