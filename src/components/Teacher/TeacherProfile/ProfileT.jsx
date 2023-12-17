import ProNavbar from "./ProNavbarT";
import { useAuth } from "../../CommonComps/LoginContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProfileImage from "./ProfileImageT";
import { Tilt } from "react-tilt";
import { FiChevronDown } from "react-icons/fi";

const ProfileT = () => {
  const { userData } = useAuth();

  return (
    <div className="h-full flex flex-col pc:flex-row pc:items-start mb-10 relative">
      <div className=" absolute pc:hidden top-[14vh] px-3 h-[6vh] w-[40px] bg-gray-300 flex justify-start items-center rounded-l-[50px] right-0"></div>
      <ProNavbar
        className={
          "hidden pc:block absolute z-40 top-[14vh] right-0 pc:sticky pc:top-[15%] ml-3 mb-52"
        }
      />
      {/* left */}
      <div className="relative w-full pc:-left-[3.8rem] pc:h-[88vh] pc:w-[30rem] mt-[6rem] pc:border-r-[0.1px] pl-10 laptop:pl-24 pt-5 pc:border-r-black/60 pc:ml-3">
        <ProfileImage
          userData={userData}
          className={`flex flex-col gap-2 mt-4 mr-[30px]`}
        />
      </div>
      {/* right */}
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

export default ProfileT;
