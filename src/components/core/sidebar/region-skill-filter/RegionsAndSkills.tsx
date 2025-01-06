import { INITIAL_VISIBLE_COUNT } from "@/constants/constants";
import React, { useState } from "react";
import RegionCard from "@/components/page/card/RegionCard";
import SkillCard from "@/components/page/card/SkillCard";

interface RegionsAndSkillsProps {
  data: string[];
  setCount: (e: any) => void;
  name: string;
  location?: string[];
}

const RegionsAndSkills = ({
  data,
  setCount,
  name,
  location,
}: RegionsAndSkillsProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <>
      <div className="skill-filter">
        <div className="skill-filter__heading">{name}</div>
        <div className="skill-filter__skills">
          {name === "Skills" ? (
            <>
              {isVisible
                ? data.map((item: string, index: number) => (
                    <SkillCard
                      item={item}
                      key={index}
                      setCount={setCount}
                      paramName={name}
                    />
                  ))
                : data
                    .slice(0, INITIAL_VISIBLE_COUNT)
                    .map((item: string, index: number) => (
                      <SkillCard
                        item={item}
                        key={index}
                        setCount={setCount}
                        paramName={name}
                      />
                    ))}
            </>
          ) : (
            <>
              {isVisible
                ? data.map((item: string, index: number) => (
                    <RegionCard
                      item={item}
                      key={index}
                      setCount={setCount}
                      paramName={name}
                      className={
                        location?.includes(item) ? "" : "filter__name--disable"
                      }
                    />
                  ))
                : data
                    .slice(0, INITIAL_VISIBLE_COUNT)
                    .map((item: string, index: number) => (
                      <RegionCard
                        item={item}
                        key={index}
                        setCount={setCount}
                        paramName={name}
                        className={
                          location?.includes(item)
                            ? ""
                            : "filter__name--disable"
                        }
                      />
                    ))}
            </>
          )}
        </div>
        {data.length > INITIAL_VISIBLE_COUNT && (
          <div
            className="skill-filter__hidden"
            onClick={() => setIsVisible((prev: boolean) => !prev)}
          >
            {isVisible ? (
              <>
                Show less <img src="/icons/filter-dropdown.svg" alt="" />
                <div className="skill-filter__hidden__skill-count">{0}</div>
              </>
            ) : (
              <>
                Show more <img src="/icons/filter-dropdown.svg" alt="" />
                <div className="skill-filter__hidden__skill-count">
                  {data.length - INITIAL_VISIBLE_COUNT}
                </div>
              </>
            )}
          </div>
        )}
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
          .skill-filter__hidden__skill-count {
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

export default RegionsAndSkills;
