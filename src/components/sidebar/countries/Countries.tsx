import RegionCard from "@/components/card/RegionCard";
import { INITIAL_VISIBLE_COUNT } from "@/constants/constants";
import { FilterType } from "@/types/filterType";
import { LocationType } from "@/types/locationType";
import React, { useState } from "react";

interface CountriesProps {
  data: FilterType;
  location: LocationType[];
}

const Countries = ({ data, location }: CountriesProps) => {
  const [isCountriesVisible, setIsCountriesVisible] = useState<boolean>(false);

  const membersCountry = location.map(
    (region: LocationType) => region?.country
  );
  return (
    <>
      <div className="sidebar__filter__bycountries flex flex-col">
        <div className="region-text">Country</div>
        <div className="region-names flex flex-wrap">
          {isCountriesVisible
            ? data.countries.map((item: string, index: number) => (
                <RegionCard
                  item={item}
                  key={index}
                  className={
                    membersCountry.includes(item)
                      ? "filter__name--highlighted"
                      : "filter__name"
                  }
                />
              ))
            : data.countries
                .slice(0, INITIAL_VISIBLE_COUNT)
                .map((item: string, index: number) => (
                  <RegionCard
                    item={item}
                    key={index}
                    className={
                      membersCountry.includes(item)
                        ? "filter__name--highlighted"
                        : "filter__name"
                    }
                  />
                ))}
        </div>
        <div
          className="region-hidden flex items-center"
          onClick={() => setIsCountriesVisible((prev) => !prev)}
        >
          {isCountriesVisible ? (
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
                {data.countries.length - INITIAL_VISIBLE_COUNT}
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

export default Countries;
