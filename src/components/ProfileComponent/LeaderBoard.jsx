import { useEffect, useState } from "react";
import ProNavbar from "./ProNavbar";
import { useAuth } from "../CommonComps/LoginContext.jsx";
import LeaderBoardTab from "./LeaderBoardTab.jsx";
import { useRanking } from "./RankingContext.jsx";
import { FiChevronDown } from "react-icons/fi";

const LeaderBoard = () => {
  const { userData } = useAuth();
  const { userRanking, filterDataByTab, selectedTab, profileOn, setProfileOn } =
    useRanking();

  return (
    <>
      <div className="h-[calc(100vh-14vh)] flex flex-row items-start mb-10 font-playpen mt-[14vh] relative">
        <div className=" absolute pc:hidden -top-10 px-3 h-[6vh] w-[40px] bg-gray-300 flex justify-start items-center rounded-l-[50px] right-0">
          <FiChevronDown
            onClick={() => setProfileOn(!profileOn)}
            className={` ${
              profileOn ? "-rotate-90" : " rotate-90"
            } h-[20px] tablet:bottom-0 transition-all hover:scale-125 cursor-pointer z-50`}
          />
        </div>
        <ProNavbar className={"hidden pc:block z-40 pc:sticky pc:top-[15%] ml-3 mb-52 bg-white"} />
        {profileOn &&  <ProNavbar className={"absolute pc:hidden z-40 top-[0] right-0 pc:sticky pc:top-[15%] ml-3 mb-52 bg-white"} />}
        <div
          style={{
            boxShadow: "-3px 3px 8px #c5c5c5,-3px -3px  8px #ffffff",
          }}
          className="h-[80vh] pc:w-[300px] absolute bg-[#fffefd74] text-[#6d6b6b] overflow-y-scroll right-1 pc:right-20 bottom-10 rounded-md border-t-[2px] border-r-[2px]"
        >
          <div className=" m-8 text-[25px] ">#Rankings</div>
          {filterDataByTab(selectedTab)?.map((item, index) => (
            <div key={index} className=" mx-10 flex flex-col my-2">
              <div className="text-[20px]">
                #{index + 1} {item.username}
              </div>
              <div className="">score: {item.totalExp}</div>
            </div>
          ))}
        </div>
        <div className="text-center text-[32px] font-playpen mb-10 absolute w-[70%] pc:ml-[220px] top-5">
          Leader Board
        </div>
        <div className=" absolute top-20 ml-10 pc:ml-[250px] w-[20%] flex flex-col items-center">
          <div className=" text-[22px] mb-1">Your Rank</div>
          <div
            className=" w-[150px] h-[150px] flex flex-col items-center justify-center rounded-md text-[#6d6b6b]"
            style={{
              boxShadow: "-3px 3px 8px #c5c5c5,-3px -3px  8px #ffffff",
            }}
          >
            <div>{userRanking?.split(" ")[0]}</div>
            <div>{userRanking?.split(" ")[1]}</div>
            <div>{userData?.fullname}</div>
          </div>
        </div>
        <div className="flex flex-col w-[90%] mt-20 pc:items-center absolute left-2 pc:left-[8%] top-60 pc:top-0">
          <LeaderBoardTab
            name={"2"}
            click={"2"}
            className={
              "text-[#6d6b6b] hover:scale-105 transition-all duration-300  cursor-pointer w-[60%] pc:w-[30%] flex flex-row items-center justify-between my-2 px-3 py-2 border-r-[2px] border-l-[2px] border-[#a09f9f] rounded-[3px]"
            }
            className1={` h-[32px] w-[32px]  rounded-full`}
          />
        </div>
      </div>
    </>
  );
};

export default LeaderBoard;
