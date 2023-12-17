import React, { useState } from "react";
import { useAuth } from "../../CommonComps/LoginContext.jsx";
import ProNavbarT from "./ProNavbarT.jsx";

const Dashboard = () => {
  const { userData } = useAuth();
  return (
    <div className=" flex flex-row items-center">
      <ProNavbarT
        className={
          "hidden pc:block absolute z-40 top-[14vh] right-0 pc:sticky pc:top-[15%] ml-3 mb-52"
        }
      />
      <div className="  relative w-full pc:-left-[3.8rem] pc:h-[88vh] pc:w-[30rem] mt-[6rem] pl-10 laptop:pl-24 pt-10 pc:ml-3 flex flex-col gap-5">
        <div className="flex flex-col relative min-h-[10vh] gap-2 font-semibold text-[20px]">
          Can Teach
          <div className="flex flex-wrap gap-10 ">
            {userData.classes &&
              userData.classes
                .split(",")
                .map((item, index) => (
                  <div className=" w-[100px] h-[50px] hover:text-white hover:bg-blue-500 transition-colors text-[20px] font-semibold cursor-pointer border-2 border-blue-300 flex items-center justify-center rounded-[5px]">
                    {" "}
                    {item}
                  </div>
                ))}
          </div>
        </div>
        <div className="flex flex-col relative min-h-[10vh] gap-2 font-semibold text-[20px]">
          Subjects Taught
          <div className="flex flex-col gap-2 ">
            {userData.classes &&
              userData.classes
                .split(",")
                .map((item, index) => (
                  <div className=" min-w-[100px] min-h-[40px] hover:text-white hover:bg-blue-500 transition-colors text-[20px] font-semibold cursor-pointer border-2 border-blue-300 flex items-center justify-center rounded-[4px]">
                    {" "}
                    {item}
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
