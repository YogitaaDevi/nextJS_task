import React from "react";
import Button from "../button/Button";
import { SkillType } from "@/types/skillType";

interface SkillCardProps {
  item: SkillType;
}

const SkillCard = ({ item }: SkillCardProps) => {
  const truncateSkill = (text: string): string => {
    if (text.length > 5) {
      return `${text.slice(0, 5)}...`;
    }
    return text;
  };

  return (
    <>
      <Button
        className="region__filter__name"
        name={truncateSkill(item.title)}
      />
    </>
  );
};

export default SkillCard;
