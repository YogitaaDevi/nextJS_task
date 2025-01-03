import { MemberType } from "@/types/memberType";
import { SkillType } from "@/types/skillType";
import React from "react";
import MemberSkills from "./MemberSkills";

interface ListCardProps {
  member: MemberType;
}

const MemberListView = ({ member }: ListCardProps) => {
  const visibleSkills = member.skills.slice(0, 2);
  const count = member.skills.length > 2 ? member.skills.length - 2 : 0;

  return (
    <div className="list-view">
      <div className="list-view__profile">
        <img
          src="/icons/profile.jpg"
          alt=""
          className="list-view__profile__img"
        />
        <div className="list-view__profile__details">
          <p className="list-view__profile__details__name">{member.name}</p>
          <div className="list-view__profile__details">
            <p>place</p>
            <p>job</p>
          </div>
        </div>
      </div>
      <div className="card__member__skills">
        {visibleSkills.map((skill: SkillType, index: number) => (
          <MemberSkills item={skill} key={index} />
        ))}
        {count !== 0 && <MemberSkills count={count} />}
      </div>

      <style jsx>{`
        .list-view {
          width: 100%;
          height: 110px;
          background-color: white;
          border-radius: 10px;
          box-shadow: 0px 0px 4px rgb(224, 224, 224);
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .list-view__profile {
          gap: 15px;
          display: flex;
        }

        .list-view__profile__img {
          width: 70px;
          height: 70px;
          border-radius: 50%;
        }

        .list-view__profile__details {
          gap: 6px;
          display: flex;
          flex-direction: column;
        }

        .list-view__profile__details__name {
          font-weight: 600;
          font-size: 18px;
        }
      `}</style>
    </div>
  );
};

export default MemberListView;
