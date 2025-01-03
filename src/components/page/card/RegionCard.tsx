let selectedFilter: string[] = [];
let updatedFilter: string[] = [];

import React from "react";
import Button from "../../ui/button/Button";
import { useRouter, useSearchParams } from "next/navigation";

interface RegionCardProps {
  item: string;
  className: string;
  setCount: (e: any) => void;
  paramName: string;
}

const RegionCard = ({ item, className, setCount, paramName }: RegionCardProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams.toString());
  const currentFilter = searchParams.get(paramName)?.split("|") || [];

  const handleSelectedRegion = (name: string) => {
    if (selectedFilter.includes(name)) {
      updatedFilter.splice(updatedFilter.indexOf(name), 1);
      selectedFilter.splice(selectedFilter.indexOf(name), 1);
      currentParams.set(paramName, updatedFilter.join("|"));
      setCount((prev: number) => prev - 1);
    } else {
      selectedFilter.push(name);
      updatedFilter = [...currentFilter, ...selectedFilter];
      currentParams.set(paramName, updatedFilter.join("|"));
      setCount((prev: number) => prev + 1);
    }
    if (updatedFilter.length === 0) {
      currentParams.delete(paramName);
    }
    router.push(`?${currentParams.toString()}`);
  };

  return (
    <div className="filter">
      <Button
        className={
          currentFilter.includes(item) ? "filter__name--selected" : className
        }
        name={item}
        onClick={() => handleSelectedRegion(item)}
      />
      <style jsx>{`
        .filter {
          gap: 20px;
          display: flex;
        }
        :global(.filter__name) {
          height: 25px;
          padding: 3px 10px;
          border-radius: 50px;
          font-size: 12px;
          border: 1px solid rgb(203, 213, 225);
          margin-right: 5px;
          margin-bottom: 8px;
          background-color: white;
          color: rgb(108, 123, 145);
          cursor: pointer;
        }
        :global(.filter__name--disable) {
          height: 25px;
          padding: 3px 10px;
          border-radius: 50px;
          font-size: 12px;
          border: 1px solid rgb(203, 213, 225);
          margin-right: 5px;
          margin-bottom: 8px;
          background-color: rgb(248, 250, 252);
          color: rgb(108, 123, 145);
          cursor: pointer;
        }
        :global(.filter__name--selected) {
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

export default RegionCard;
