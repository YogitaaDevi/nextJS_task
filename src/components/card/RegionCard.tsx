"use client";
import React from "react";
import Button from "../button/Button";
import "./style.css";
import { useRouter, useSearchParams } from "next/navigation";

interface RegionCardProps {
  item: string;
}
const RegionCard = ({ item }: RegionCardProps) => {
  // const router = useRouter();
  // const searchParams = useSearchParams();
  // const currentParams = new URLSearchParams(searchParams.toString());

  // const handleClick = (regionValue: string, regionKey: string) => {
  //   if (currentParams.get(regionKey) === regionValue) {
  //     currentParams.delete(regionKey);
  //   } else {
  //     currentParams.set(regionKey, regionValue);
  //     console.log(regionKey, regionValue);
  //   }
  //   router.push(`?${currentParams.toString()}`);
  // };

  return (
    <div className="flex region__filter">
      <Button
        className="region__filter__name"
        // onClick={() => handleClick(item, "region")}
        name={item}
      />
    </div>
  );
};

export default RegionCard;
