import React from "react";
import { MemberType } from "@/types/memberType";
import MemberSkills from "./MemberSkills";
import { SkillType } from "@/types/skillType";

interface CardProps {
  member: MemberType;
}

const MemberGridView = ({ member }: CardProps) => {
  const visibleSkills = member.skills.slice(0, 2);
  const count = member.skills.length > 2 ? member.skills.length - 2 : 0;

  return (
    <div className="card">
      <div className="card__profile">
        <img src="/icons/profile.jpg" alt="" className="card__profile__img" />
      </div>
      <div className="card__member">
        <div className="card__member__details flex flex-col items-center">
          <p>{member.name}</p>
          <p>Place</p>
          <p>Job</p>
        </div>
        <div className="card__member__skills">
          {visibleSkills.map((skill: SkillType, index: number) => (
            <MemberSkills item={skill} key={index} />
          ))}
          {count !== 0 && <MemberSkills count={count} />}
        </div>
      </div>

      <style jsx>{`
        .card {
          background-color: white;
          height: 280px;
          border-radius: 12px;
          background: linear-gradient(180deg, rgb(245, 247, 250) 32%, white 0);
          text-align: center;
          box-shadow: 0px 0px 4px rgb(224, 224, 224);
        }

        .card__profile {
          width: 100%;
          height: 90px;
          border-bottom: 0.5px solid rgb(203, 213, 225);
          overflow: clip;
          padding: 0 85px;
        }

        .card__profile__img {
          width: 105px;
          height: 105px;
          border-radius: 50%;
          border: 20px solid transparent;
          outline: 1px solid rgb(203, 213, 225);
        }

        .card__member {
          padding: 20px 15px 0;
        }

        .card__member__details {
          height: 115px;
          width: 100%;
          border-bottom: 0.5px solid rgb(203, 213, 225);
          gap: 8px;
        }

        .card__member__skills {
          margin-top: 12px;
        }
      `}</style>
    </div>
  );
};

export default MemberGridView;
