import React from "react";
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import "./style.css";
import DisplayMembers from "@/components/displayMembers/DisplayMembers";
import { fetchFilters, fetchMembers, fetchRoles } from "@/service/apiService";

const page = async () => {
  const data = await fetchFilters();
  // const roles = await fetchRoles();
  return (
    <>
      <Header />
      <div className="flex main__layout">
        <Sidebar data={data}/>
        <div className="flex flex-col main__layout__membersSide">
          <DisplayMembers />
        </div>
      </div>
    </>
  );
};

export default page;
