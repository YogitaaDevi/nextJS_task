import React from "react";
import Button from "../button/Button";
import { useRouter, useSearchParams } from "next/navigation";

interface SkillCardSidebarProps {
  item: string;
  setCount: (e: any) => void;
}

const SkillCardSidebar = ({ item, setCount }: SkillCardSidebarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams.toString());
  const handleSelectFilter = (name: string) => {
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
    console.log(currentSkills, "------------------from rolecard");
    router.push(`?${currentParams.toString()}`);
  };
  return (
    <div className="filter flex">
      <Button
        className="filter__name__skill"
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
      `}</style>
    </div>
  );
};

export default SkillCardSidebar;
