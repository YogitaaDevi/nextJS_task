import React from "react";
import "./style.css";
import { MemberType } from "@/types/memberType";

interface CardProps {
  member: MemberType;
}

const Card = ({ member }: CardProps) => {
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
        <div></div>
      </div>
    </div>
  );
};

export default Card;