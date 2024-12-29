import React, { useState } from "react";
import Button from "../../ui/button/Button";
import { useRouter, useSearchParams } from "next/navigation";

interface MemberSkillsProps {
  item: string;
  setCount: (e: any) => void;
}

const SkillCard = ({ item, setCount }: MemberSkillsProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams.toString());
  const handleSelectFilter = (name: string) => {
    setIsSelected((prev) => !prev);
    const currentSkills = searchParams.get("skills")?.split("|") || [];
    if (!currentSkills.includes(name)) {
      currentSkills.push(name);
      setCount((prev: number) => prev + 1);
    } else {
      const updatedSkills = currentSkills.filter((role) => role !== name);
      currentSkills.length = 0;
      currentSkills.push(...updatedSkills);
      setCount((prev: number) => prev - 1);
    }
    if (currentSkills.length > 0) {
      currentParams.set("skills", currentSkills.join("|"));
    } else {
      currentParams.delete("skills");
    }
    router.push(`?${currentParams.toString()}`);
  };
  return (
    <div className="filter flex">
      {}
      <Button
        className={
          isSelected ? "filter__name__skill--selected" : "filter__name__skill"
        }
        name={item}
        onClick={() => handleSelectFilter(item)}
      />
      <style jsx>{`
        .filter {
          gap: 20px;
        }
        :global(.filter__name__skill) {
          height: 25px;
          padding: 3px 10px;
          border-radius: 50px;
          font-size: 12px;
          border: 1px solid rgb(203, 213, 225);
          margin-right: 5px;
          margin-bottom: 8px;
          background-color: white;
          cursor: pointer;
        }
        :global(.filter__name__skill--selected) {
          height: 25px;
          padding: 3px 10px;
          border-radius: 50px;
          font-size: 12px;
          border: 1px solid rgb(29 78 216);
          color: rgb(29 78 216);
          margin-right: 5px;
          margin-bottom: 8px;
          background-color: rgb(219 234 254);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default SkillCard;
