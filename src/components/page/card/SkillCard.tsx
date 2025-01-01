let selectedSkills: string[] = [];
let updatedSkills: string[] = [];

import React, { useEffect, useState } from "react";
import Button from "../../ui/button/Button";
import { useRouter, useSearchParams } from "next/navigation";

interface MemberSkillsProps {
  item: string;
  setCount: (e: any) => void;
  count: number;
}

const SkillCard = ({ item, setCount, count }: MemberSkillsProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams.toString());

  const handleSelectFilter = (name: string) => {
    const currentSkills = searchParams.get("skills")?.split("|") || [];
    if (!isSelected) {
      selectedSkills.push(name);
      updatedSkills = [...currentSkills, ...selectedSkills];
      setCount((prev: number) => prev + 1);
    } else {
      updatedSkills.splice(updatedSkills.indexOf(name), 1);
      selectedSkills.splice(selectedSkills.indexOf(name), 1);
      setCount((prev: number) => prev - 1);
    }
    if (updatedSkills.length > 0) {
      currentParams.set("skills", updatedSkills.join("|"));
    } else {
      currentParams.delete("skills");
    }
    router.push(`?${currentParams.toString()}`);
    setIsSelected((prev) => !prev);
  };

  useEffect(() => {
    if (count === 0) {
      setIsSelected(false);
    }
  }, [count]);

  return (
    <div className="filter flex">
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
