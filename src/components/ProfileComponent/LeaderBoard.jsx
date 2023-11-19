import { useEffect, useState } from "react";
import ProNavbar from "./ProNavbar";
import axios from "axios";
import staticData from "./staticData.js";
import { useAuth } from "../CommonComps/LoginContext.jsx";
import LeaderBoardTab from "./LeaderBoardTab.jsx";
import { useRanking } from "./RankingContext.jsx";

const LeaderBoard = () => {
  const { userData } = useAuth();
  const {rankingData, setRankingData, filterDataByTab,  selectedTab } = useRanking()

  return (
    <>
      <div className="h-[calc(100vh-14vh)] flex flex-row items-start mb-10 font-playpen mt-[14vh] relative">
        <ProNavbar className={"sticky top-[15%] ml-3 mb-52 w-[20%] "} />
        <div
          style={{
            boxShadow: "-3px 3px 8px #c5c5c5,-3px -3px  8px #ffffff",
          }}
          className="h-[80vh] w-[300px] absolute bg-[#eeeeee] overflow-y-scroll right-10 rounded-md border-t-[2px] border-r-[2px]"
        >
        
          <div className=" m-8 text-[25px]">#Rankings</div>
          {filterDataByTab(selectedTab)?.map((item, index) => (
            <div key={index} className="text-black mx-10 flex flex-col my-2">
              <div className="text-[20px]">#{index+1} {" "} {item.username}</div>
              <div className="">score: {item.totalExp}</div>
            </div>
          ))}
        </div>
        <div className="text-center text-[32px] font-playpen mb-10 absolute w-[70%] ml-[220px]   top-5">
          Leader Boards
        </div>
        <div className="flex-1 mt-20">
          <LeaderBoardTab 
          className={'cursor-pointer w-[30%] flex flex-row items-center justify-between my-2 px-3 py-2 border-r-[2px] border-l-[2px] border-[#a09f9f] rounded-[3px]'} 
          className1={` h-[32px] w-[32px]  rounded-full`}/>
        </div>
        
      </div>
    </>
  );
};

export default LeaderBoard;
