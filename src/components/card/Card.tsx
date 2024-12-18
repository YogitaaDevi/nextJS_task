import React from "react";
import "./style.css";
import { MemberType } from "@/types/memberType";
import SkillCard from "./SkillCard";
import { SkillType } from "@/types/skillType";

interface CardProps {
  member: MemberType;
}

const Card = ({ member }: CardProps) => {
  const visibleSkills = member.skills.slice(0, 2);
  const count = member.skills.length > 2 ? member.skills.length - 2 : 0;
  return (
    <div className="card__container">
      <div className="card__container__profile">
        <img src="/icons/profile.jpg" alt="" className="profile-img" />
      </div>
      <div className="card__container__details">
        <div className="member__details flex flex-col items-center">
          <p>{member.name}</p>
          <p>Place</p>
          <p>Job</p>
        </div>
        <div className="member__skills">
          {visibleSkills.map((skill: SkillType, index: number) => (
            <SkillCard item={skill} key={index} />
          ))}
          {count != 0 && <SkillCard count={count} />}
        </div>
      </div>
    </div>
  );
};

export default Card;
