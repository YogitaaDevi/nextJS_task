import RegionCard from "@/components/card/RegionCard";
import { FilterType } from "@/types/filterType";
import { LocationType } from "@/types/locationType";
import React from "react";

interface RegionsProps {
  data: FilterType;
  location: LocationType[];
}

const Regions = ({ data, location }: RegionsProps) => {
  const membersRegion = location.map(
    (region: LocationType) => region?.continent
  );
  return (
    <div className="sidebar__filter__byregion flex flex-col">
      <div className="region-text">Region</div>
      <div className="region-names flex flex-wrap">
        {data.regions.map((item: string, index: number) => (
          <RegionCard
            item={item}
            key={index}
            className={
              membersRegion.includes(item)
                ? "filter__name--highlighted"
                : "filter__name"
            }
          />
        ))}
      </div>
      <style jsx>{`
        .sidebar__filter__byregion {
          height: 140px;
          width: 100%;
          gap: 16px;
          border-bottom: 0.5px solid rgb(203, 213, 225);
        }
        .region-text {
          font-size: 14px;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default Regions;
