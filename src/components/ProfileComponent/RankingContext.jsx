import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '../CommonComps/LoginContext';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:8800");

const RankingContext = createContext();

export const RankingProvider = ({ children }) => {
  const [rankingData, setRankingData] = useState([]);
  const [selectedTab, setSelectedTab] = useState("Platinum");
  const { userData } = useAuth();
  const [userRanking, setUserRanking] = useState();


  const getData = async (course) => {
    try {
      const response = await axios.get('http://localhost:8800/auth/leadershipScores', {params: {
        inwhat: userData?.inWhat,
        course: course
      }});
      setRankingData(response.data)
    } catch (err) {
      console.log("kya hai error bata vmsdk", err);
    }
  }

  useEffect(() =>{
    if(userData?.inWhat === "college"){
      const course = userData?.collegestudent
      getData(course);
    } else if(userData?.inWhat === "school"){
      const course = userData?.schoolstudent
      getData(course);
    }else {
      console.log("no data till now");
    }
    
    setRankingData(rankingData?.sort((a, b) => b.totalExp - a.totalExp));
  },[userData]);

  useEffect(() =>{
    socket.on('ScoreDATA' , ({users}) => {
      console.log(users);
      setRankingData(users?.sort((a, b) => b.totalExp - a.totalExp));
    })
  },[socket])


  useEffect(() =>{
    const user = rankingData.find(item => item.username === userData?.username);
    
    if (user) {
      const totalCount = rankingData.length;
      const index = rankingData.findIndex(item => item.username === userData?.username);
      const userRank = calculateRank(index, totalCount);
      setUserRanking(`#${userRank[0] +1} ${userRank[1]}`);
    } else {
      console.log("'user' not found in data");
    }
  },[rankingData])

  const calculateRank = (index, totalCount) => {
    const percentage = (index / totalCount) * 100;

    if (percentage <= 10) {
        const rank = [index, "Platinum"]
      return rank;
    } else if (percentage <= 30) {
        const rank = [index, "Gold"]
      return rank;
    } else if (percentage <= 50) {
        const rank = [index, "Silver"]
      return rank;
    } else {
        const rank = [index, "Bronze"]
      return rank;
    }
  };

  const filterDataByTab = (tab) => {
    return rankingData?.filter(
      (item, index) => calculateRank(index, rankingData.length)[1] === tab 
    );
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const getTopScorer = (tab) => {
    const filteredData = filterDataByTab(tab);
    if (filteredData && filteredData.length > 0) {
      return `${filteredData[0].username}: ${filteredData[0].totalExp}`;
    }
    return 'No top scorer yet';
  };

  return (
    <RankingContext.Provider value={{socket, userRanking, rankingData, setRankingData, getTopScorer, handleTabClick, filterDataByTab, calculateRank, selectedTab, setSelectedTab }}>
      {children}
    </RankingContext.Provider>
  );
};

export const useRanking = () => useContext(RankingContext);