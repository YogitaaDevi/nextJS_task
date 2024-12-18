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
  console.log(count);
  return (
    <>
      {item && (
        <Button
          className="region__filter__name"
          name={truncateSkill(item.title)}
        />
      )}
      {count && <span className="region__filter__name">+ {count}</span>}
    </>
  );
};

export default SkillCard;
