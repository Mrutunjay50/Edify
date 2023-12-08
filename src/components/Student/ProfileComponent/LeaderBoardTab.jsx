import React from "react";
import { useRanking } from "./RankingContext";

const LeaderBoardTab = ({ className, className1, click, name }) => {
  const { rankingData, getTopScorer, handleTabClick, selectedTab } = useRanking();

  return (
    <>
      {["Platinum", "Gold", "Silver", "Bronze"].map((tab, index) => (
        <div
          key={index}
          onClick={() => handleTabClick(tab)}
          className={`${className} ${
            selectedTab === tab && click === "2" ? "bg-[#f5e8db74]" : ""
          }`}
          style={{
            boxShadow: ` ${name=== "2" ? " rgba(0, 0, 0, 0.16) 0px 1px 4px" : ""}`,
            borderRadius: "5px",
          }}
        >
          <div style={{
                boxShadow: "rgba(0, 0, 0, 0.16) 1px 1px 4px",
              }}
            className={`${
              tab === "Gold"
                ? "bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500"
                : tab === "Silver"
                ? "bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600"
                : tab === "Platinum"
                ? "bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-100 to-gray-900"
                : tab === "Bronze"
                ? "bg-gradient-to-r from-red-300 via-yellow-700 to-yellow-800"
                : ""
            } ${className1}`}
          ></div>
          <span className="">{name === "2" ? `${tab} Ranking` : ""}</span>
          #{getTopScorer(tab)?.split(":")[0]}
        </div>
      ))}
    </>
  );
};

export default LeaderBoardTab;
