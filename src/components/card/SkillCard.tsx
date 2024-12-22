import React from "react";
import Button from "../button/Button";
import { SkillType } from "@/types/skillType";

interface SkillCardProps {
  item?: SkillType;
  count?: number;
}

const SkillCard = ({ item, count }: SkillCardProps) => {
  const truncateSkill = (text: string): string => {
    if (text.length > 5) {
      return `${text.slice(0, 5)}...`;
    }
    return text;
  };
  return (
    <>
      {item && (
        <Button className="filter__name" name={truncateSkill(item.title)} />
      )}
      {count && <span className="filter__name">+ {count}</span>}
    </>
  );
};

export default SkillCard;
