import RegionCard from "@/components/page/card/RegionCard";
import { FilterType } from "@/types/filterType";
import { LocationType } from "@/types/locationType";
import React from "react";

interface RegionsProps {
  data: FilterType;
  location: LocationType[];
  setCount: (e: any) => void
}

const Regions = ({ data, location, setCount }: RegionsProps) => {
  const membersRegion = location.map(
    (region: LocationType) => region?.continent
  );
  return (
    <div className="region-filter flex flex-col">
      <div className="region-filter__heading">Region</div>
      <div className="region-filter__regions">
        {data.regions.map((item: string, index: number) => (
          <RegionCard
            item={item}
            key={index}
            setCount={setCount}
            paramName="region"
            className={
              membersRegion.includes(item)
                ? "filter__name"
                : "filter__name--disable"
            }
          />
        ))}
      </div>
      <style jsx>{`
        .region-filter {
          height: 140px;
          width: 100%;
          gap: 16px;
          border-bottom: 0.5px solid rgb(203, 213, 225);
          display: flex;
          flex-direction: column;
        }
        .region-filter__heading {
          font-size: 14px;
          font-weight: 600;
        }
        .region-filter__regions {
          display: flex;
          flex-wrap: wrap;
        }
      `}</style>
    </div>
  );
};

export default Regions;
