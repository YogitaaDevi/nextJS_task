import RegionCard from "@/components/page/card/RegionCard";
import { INITIAL_VISIBLE_COUNT } from "@/constants/constants";
import { FilterType } from "@/types/filterType";
import { LocationType } from "@/types/locationType";
import React, { useState } from "react";

interface MetroAreasProps {
  data: FilterType;
  location: LocationType[];
}

const MetroAreas = ({ data, location }: MetroAreasProps) => {
  const [isMetroAreaVisible, setIsMetroAreaVisible] = useState<boolean>(false);

  const membersArea = location.map((region: LocationType) => region?.metroArea);

  return (
    <>
      <div className="skill-filter flex flex-col">
        <div className="skill-filter__heading">Metro Area</div>
        <div className="skill-filter__skills flex flex-wrap">
          {isMetroAreaVisible
            ? data.countries.map((item: string, index: number) => (
                <RegionCard
                  item={item}
                  key={index}
                  className={
                    membersArea.includes(item)
                      ? "filter__name--highlighted"
                      : "filter__name"
                  }
                />
              ))
            : data.metroAreas
                .slice(0, INITIAL_VISIBLE_COUNT)
                .map((item: string, index: number) => (
                  <RegionCard
                    item={item}
                    key={index}
                    className={
                      membersArea.includes(item)
                        ? "filter__name--highlighted"
                        : "filter__name"
                    }
                  />
                ))}
        </div>
        <div
          className="skill-filter__hidden"
          onClick={() => setIsMetroAreaVisible((prev: boolean) => !prev)}
        >
          {isMetroAreaVisible ? (
            <>
              Show less <img src="/icons/filter-dropdown.svg" alt="" />
              <div className="skill-filter__hidden__skills-count">{0}</div>
            </>
          ) : (
            <>
              Show more <img src="/icons/filter-dropdown.svg" alt="" />
              <div className="skill-filter__hidden__skills-count">
                {data.metroAreas.length - INITIAL_VISIBLE_COUNT}
              </div>
            </>
          )}
        </div>
        <style jsx>{`
          .skill-filter {
            position: relative;
            width: 100%;
            gap: 16px;
            border-bottom: 0.5px solid rgb(203, 213, 225);
            display: flex;
            flex-direction: column;
          }
          .skill-filter__heading {
            font-size: 14px;
            font-weight: 600;
          }
          .skill-filter__skills {
            display: flex;
            flex-wrap: wrap;
          }
          .skill-filter__hidden {
            font-size: 12px;
            font-weight: 600;
            gap: 5px;
            cursor: pointer;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
          }
          .skill-filter__hidden__skills-count {
            height: 25px;
            width: 32px;
            border-radius: 10px;
            font-weight: 500;
            border: 1px solid #f1f5f9;
            background-color: #f1f5f9;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}</style>
      </div>
    </>
  );
};

export default MetroAreas;
