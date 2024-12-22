import React from "react";
import Button from "../button/Button";

interface RegionCardProps {
  item: string;
}

const RegionCard = ({ item }: RegionCardProps) => {
  return (
    <div className="region__filter flex">
      <Button className="region__filter__name" name={item} />
      <style jsx>{`
        .region__filter {
          gap: 20px;
        }
        :global(.region__filter__name) {
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