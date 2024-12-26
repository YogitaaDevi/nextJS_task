import RegionCard from "@/components/card/RegionCard";
import { INITIAL_VISIBLE_COUNT } from "@/constants/constants";
import { FilterType } from "@/types/filterType";
import React, { useState } from "react";

interface MetroAreasProps {
  data: FilterType;
}

const MetroAreas = ({ data }: MetroAreasProps) => {
  const [isMetroAreaVisible, setIsMetroAreaVisible] = useState<boolean>(false);

  return (
    <>
      <div className="sidebar__filter__bycountries flex flex-col">
        <div className="region-text">Metro Area</div>
        <div className="region-names flex flex-wrap">
          {isMetroAreaVisible
            ? data.countries.map((item: string, index: number) => (
                <RegionCard item={item} key={index} />
              ))
            : data.metroAreas
                .slice(0, INITIAL_VISIBLE_COUNT)
                .map((item: string, index: number) => (
                  <RegionCard item={item} key={index} />
                ))}
        </div>
        <div
          className="region-hidden flex items-center"
          onClick={() => setIsMetroAreaVisible((prev: boolean) => !prev)}
        >
          {isMetroAreaVisible ? (
            <>
              Show less <img src="/icons/filter-dropdown.svg" alt="" />
              <div className="region-count flex justify-center items-center">
                {0}
              </div>
            </>
          ) : (
            <>
              Show more <img src="/icons/filter-dropdown.svg" alt="" />
              <div className="region-count flex justify-center items-center">
                {data.metroAreas.length - INITIAL_VISIBLE_COUNT}
              </div>
            </>
          )}
        </div>
        <style jsx>{`
          .sidebar__filter__bycountries {
            position: relative;
            width: 100%;
            gap: 16px;
            border-bottom: 0.5px solid rgb(203, 213, 225);
          }
          .region-text {
            font-size: 14px;
            font-weight: 600;
          }
          .region-hidden {
            font-size: 12px;
            font-weight: 600;
            gap: 5px;
            cursor: pointer;
            margin-bottom: 20px;
          }
          .region-count {
            height: 25px;
            width: 32px;
            border-radius: 10px;
            font-weight: 500;
            border: 1px solid #f1f5f9;
            background-color: #f1f5f9;
          }
        `}</style>
      </div>
    </>
  );
};

export default MetroAreas;
