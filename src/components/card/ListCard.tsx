import { MemberType } from "@/types/memberType";
import { SkillType } from "@/types/skillType";
import React from "react";
import SkillCard from "./SkillCard";

interface ListCardProps {
  member: MemberType;
}

const ListCard = ({ member }: ListCardProps) => {
  const visibleSkills = member.skills.slice(0, 2);
  const count = member.skills.length > 2 ? member.skills.length - 2 : 0;

  return (
    <div className="list__card flex justify-between items-center">
      <div className="list__card__members flex">
        <img src="/icons/profile.jpg" alt="" className="profile-img-list" />
        <div className="flex flex-col card__members__details">
          <p className="members__details__name">{member.name}</p>
          <div className="flex card__members__details">
            <p>place</p>
            <p>job</p>
          </div>
        </div>
      </div>
      <div className="member__skills">
        {visibleSkills.map((skill: SkillType, index: number) => (
          <SkillCard item={skill} key={index} />
        ))}
        {count !== 0 && <SkillCard count={count} />}
      </div>

      <style jsx>{`
        .list__card {
          width: 100%;
          height: 110px;
          background-color: white;
          border-radius: 10px;
          box-shadow: 0px 0px 4px rgb(224, 224, 224);
          padding: 0 20px;
        }

        .list__card__members {
          gap: 15px;
        }

        .profile-img-list {
          width: 70px;
          height: 70px;
          border-radius: 50%;
        }

        .card__members__details {
          gap: 6px;
        }

        .members__details__name {
          font-weight: 600;
          font-size: 18px;
        }
      `}</style>
    </div>
  );
};

export default ListCard;
