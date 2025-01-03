let selectedSkills: string[] = [];
let updatedSkills: string[] = [];

import React from "react";
import Button from "../../ui/button/Button";
import { useRouter, useSearchParams } from "next/navigation";

interface MemberSkillsProps {
  item: string;
  setCount: (e: any) => void;
  count: number;
}

const SkillCard = ({ item, setCount, count }: MemberSkillsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams.toString());
  const currentSkills = searchParams.get("skills")?.split("|") || [];

  const handleSelectFilter = (name: string) => {
    if (selectedSkills.includes(name)) {
      updatedSkills.splice(updatedSkills.indexOf(name), 1);
      selectedSkills.splice(selectedSkills.indexOf(name), 1);
      currentParams.set("skills", updatedSkills.join("|"));
      setCount((prev: number) => prev - 1);
    } else {
      selectedSkills.push(name);
      updatedSkills = [...currentSkills, ...selectedSkills];
      currentParams.set("skills", updatedSkills.join("|"));
      setCount((prev: number) => prev + 1);
    }
    if (updatedSkills.length === 0) {
      currentParams.delete("skills");
    }
    router.push(`?${currentParams.toString()}`);
  };


  return (
    <div className="filter">
      <Button
        className={
          currentSkills.includes(item)
            ? "filter__name__skill--selected"
            : "filter__name__skill"
        }
        name={item}
        onClick={() => handleSelectFilter(item)}
      />
      <style jsx>{`
        .filter {
          gap: 20px;
          display: flex;
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
