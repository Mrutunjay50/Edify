import { useEffect, useState } from "react";
import ProNavbar from "./ProNavbar";
import axios from "axios";
import staticData from "./staticData.js";
import { useAuth } from "../CommonComps/LoginContext.jsx";
import LeaderBoardTab from "./LeaderBoardTab.jsx";
import { useRanking } from "./RankingContext.jsx";

const LeaderBoard = () => {
  const { userData } = useAuth();
  const {userRanking, filterDataByTab,  selectedTab } = useRanking()

  return (
    <>
      <div className="h-[calc(100vh-14vh)] flex flex-row items-start mb-10 font-playpen mt-[14vh] relative">
        <ProNavbar className={"sticky top-[15%] ml-3 mb-52 w-[20%] "} />
        <div
          style={{
            boxShadow: "-3px 3px 8px #c5c5c5,-3px -3px  8px #ffffff",
          }}
          className="h-[80vh] w-[300px] absolute bg-[#fffefd74] text-[#6d6b6b] overflow-y-scroll right-20 bottom-10 rounded-md border-t-[2px] border-r-[2px]"
        >
        
          <div className=" m-8 text-[25px] ">#Rankings</div>
          {filterDataByTab(selectedTab)?.map((item, index) => (
            <div key={index} className=" mx-10 flex flex-col my-2">
              <div className="text-[20px]">#{index+1} {" "} {item.username}</div>
              <div className="">score: {item.totalExp}</div>
            </div>
          ))}
        </div>
        <div className="text-center text-[32px] font-playpen mb-10 absolute w-[70%] ml-[220px] top-5">
          Leader Board
        </div>
        <div className=" absolute top-20 ml-[250px] w-[20%] flex flex-col items-center">
          <div className=" text-[22px] mb-1">Your Rank</div>
          <div className=" w-[150px] h-[150px] flex flex-col items-center justify-center rounded-md text-[#6d6b6b]"
          style={{
            boxShadow: "-3px 3px 8px #c5c5c5,-3px -3px  8px #ffffff",
          }}>
            <div>{userRanking?.split(" ")[0]}</div>
            <div>{userRanking?.split(" ")[1]}</div>
            <div>{userData?.fullname}</div>
          </div>
        </div>
        <div className="flex flex-col w-[90%] mt-20 items-center absolute left-[8%]">
          <LeaderBoardTab 
          name={"2"}
          click={"2"}
          className={'text-[#6d6b6b] hover:scale-105 transition-all duration-300  cursor-pointer w-[30%] flex flex-row items-center justify-between my-2 px-3 py-2 border-r-[2px] border-l-[2px] border-[#a09f9f] rounded-[3px]'} 
          className1={` h-[32px] w-[32px]  rounded-full`}/>
        </div>
        
      </div>
    </>
  );
};

export default LeaderBoard;
