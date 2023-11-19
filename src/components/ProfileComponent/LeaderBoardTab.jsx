import React from 'react'
import { useRanking } from './RankingContext'

const LeaderBoardTab = ({className, className1}) => {

    const { rankingData, getTopScorer, handleTabClick, selectedTab, } = useRanking()

  return (
    <>{["Gold", "Silver", "Copper", "Bronze"].map((tab, index) => (
        <div
          key={index}
          onClick={() => handleTabClick(tab)}
          className={`${className} ${
            selectedTab === tab ? "bg-[#eba66674]" : ""
          }`}
          style={{ boxShadow:
                            "-3px 3px 8px #c5c5c5,-3px -3px  8px #dddbdb",
                          borderRadius: "5px",
                        }}
        >
          <div className={`${tab === "Gold" ? "bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500" : tab === "Silver" ?  "bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600" : tab === "Copper" ? "bg-gradient-to-r from-orange-600 to-orange-400" : tab === "Bronze"? "bg-gradient-to-r from-red-300 via-yellow-700 to-yellow-800" : ""} ${className1}`}></div>
          <span className="">{`${tab} Ranking`}</span>
          {getTopScorer(tab)}
        </div>
      ))}</>
  )
}

export default LeaderBoardTab