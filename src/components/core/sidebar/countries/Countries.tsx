import RegionCard from "@/components/page/card/RegionCard";
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
      <div className="country-filter">
        <div className="country-filter__heading">Country</div>
        <div className="country-filter__countries">
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
          className="country-filter__hidden"
          onClick={() => setIsCountriesVisible((prev) => !prev)}
        >
          {isCountriesVisible ? (
            <>
              Show less <img src="/icons/filter-dropdown.svg" alt="" />
              <div className="country-filter__hidden__country-count">{0}</div>
            </>
          ) : (
            <>
              Show more <img src="/icons/filter-dropdown.svg" alt="" />
              <div className="country-filter__hidden__country-count">
                {data.countries.length - INITIAL_VISIBLE_COUNT}
              </div>
            </>
          )}
        </div>
        <style jsx>{`
          .country-filter {
            position: relative;
            width: 100%;
            gap: 16px;
            border-bottom: 0.5px solid rgb(203, 213, 225);
            display: flex;
            flex-direction: column;
          }
          .country-filter__heading {
            font-size: 14px;
            font-weight: 600;
          }
          .country-filter__countries {
            display: flex;
            flex-wrap: wrap;
          }
          .country-filter__hidden {
            font-size: 12px;
            font-weight: 600;
            gap: 5px;
            cursor: pointer;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
          }
          .country-filter__hidden__country-count {
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

export default Countries;
