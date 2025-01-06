"use client";

import React from "react";
import Button from "../../ui/button/Button";
import { useRouter, useSearchParams } from "next/navigation";

interface RegionCardProps {
  item: string;
  className: string;
  setCount: (e: any) => void;
  paramName: string;
}

const RegionCard = ({
  item,
  className = "",
  setCount,
  paramName,
}: RegionCardProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams.toString());

  const handleSelectedRegion = (name: string) => {
    const currentValues = currentParams.getAll(paramName.toLowerCase());
    const isAlreadySelected = currentValues.includes(name);
    if (isAlreadySelected) {
      const updatedValues = currentValues.filter((value) => value !== name);
      currentParams.delete(paramName.toLowerCase());
      updatedValues.forEach((value) =>
        currentParams.append(paramName.toLowerCase(), value)
      );
      setCount((prev: number) => prev - 1);
    } else {
      currentParams.append(paramName.toLowerCase(), name);
      setCount((prev: number) => prev + 1);
    }
    router.push(`?${currentParams.toString()}`);
  };
  const isSelected = currentParams
    .getAll(paramName.toLowerCase())
    .includes(item);
console.log(paramName)
  return (
    <div className="filter">
      <Button
        className={
          className.length > 0
            ? className
            : isSelected
            ? "filter__name--selected"
            : "filter__name"
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
        :global(.filter__name__skill:hover) {
          border: 1px solid rgb(145, 145, 146);
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
