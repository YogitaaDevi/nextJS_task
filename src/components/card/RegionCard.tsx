"use client";
import React from "react";
import Button from "../button/Button";
import "./style.css";
import { useRouter, useSearchParams } from "next/navigation";

interface RegionCardProps {
  item: string;
}
const RegionCard = ({ item }: RegionCardProps) => {
  return (
    <div className="flex region__filter">
      <Button className="region__filter__name" name={item} />
    </div>
  );
};

export default RegionCard;
