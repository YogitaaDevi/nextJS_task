import React from "react";
import Button from "../button/Button";
import { useRouter, useSearchParams } from "next/navigation";

interface RegionCardProps {
  item: string;
}

const RegionCard = ({ item }: RegionCardProps) => {
  return (
    <div className="filter flex">
      <Button
        className="filter__name"
        name={item}
      />
      <style jsx>{`
        .filter {
          gap: 20px;
        }
        :global(.filter__name) {
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
      `}</style>
    </div>
  );
};

export default RegionCard;
