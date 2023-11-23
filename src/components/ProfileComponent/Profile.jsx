import ProNavbar from "./ProNavbar";
import { useAuth } from "../CommonComps/LoginContext";
import LastSeen from "./LastSeen";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProfileImage from "./ProfileImage";
import { Tilt } from "react-tilt";
import LeaderBoardTab from "./LeaderBoardTab";
import { useRanking } from "./RankingContext";
import { FiChevronDown } from "react-icons/fi";

const Profile = () => {
  const { userData } = useAuth();
  const [completedItems, setCompletedItems] = useState(undefined);
  const { userRanking, profileOn, setProfileOn } = useRanking();

  useEffect(() => {
    setCompletedItems(userData?.completedItems);
  }, [userData]);

  return (
    <div className="h-full flex flex-col pc:flex-row pc:items-start mb-10 relative">
    <div className=" absolute pc:hidden top-[14vh] px-3 h-[6vh] w-[40px] bg-gray-300 flex justify-start items-center rounded-l-[50px] right-0">
          <FiChevronDown
            onClick={() => setProfileOn(!profileOn)}
            className={` ${
              profileOn ? "-rotate-90" : " rotate-90"
            } h-[20px] tablet:bottom-0 transition-all hover:scale-125 cursor-pointer z-50`}
          />
        </div>
      <ProNavbar className={"hidden pc:block absolute z-40 top-[14vh] right-0 pc:sticky pc:top-[15%] ml-3 mb-52"} />
      {profileOn &&  <ProNavbar className={"absolute cd:hidden z-40 top-[14vh] right-0 ml-3 mb-52 bg-white"} />}
      {/* left */}
      <div className="relative w-full pc:-left-[3.8rem] pc:h-[88vh] pc:w-[30rem] mt-[6rem] pc:border-r-[0.1px] pl-10 laptop:pl-24 pt-5 pc:border-r-black/60 pc:ml-3">
        <ProfileImage
          userData={userData}
          className={`flex flex-col gap-2 mt-4 mr-[30px]`}
        />
      </div>
      {/* right */}
      <div className="mt-28 bg-white h-[100%] pc:w-[54vw] mb-10 pc:pr-14">
        <div className="flex flex-col gap-4 mt-3 mx-10 pc:mx-0 pc:-ml-4">
          <div className="text-3xl mt-2">Achievements</div>
          {/* circles */}
          <div className="  w-full flex flex-col laptop:flex-row flex-wrap gap-2 tablet:absolute laptop:relative top-[24vh] laptop:top-0">
            <LeaderBoardTab
              className={
                " text-[#6d6b6b] font-playpen relative cursor-pointer flex pc:w-[23%] laptop:flex-col gap-2 items-center justify-center  tablet:px-3 py-[5px] border-[#a09f9f] rounded-[3px]"
              }
              className1={`h-[60px] w-[60px] rounded-[100%] border-2 border-[#ffffff]`}
            />
          </div>
          {/* tracks */}
          <div className="flex flex-col tablet:flex-row gap-3 justify-start mt-5">
            <div
              className="pc:h-[8rem] pc:w-[15rem] bg-[rgb(252,251,247)] rounded-xl text-start px-4 py-4 flex flex-col gap-2"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                borderRadius: "5px",
              }}
            >
              <h1 className="text-xl">Weekly Rank</h1>
              <h1 className="text-4xl">
                {userRanking ? userRanking : "Loading..."}
              </h1>
            </div>
            <div
              className="pc:h-[8rem] pc:w-[15rem] bg-[rgb(252,251,247)] rounded-xl text-start px-7 py-4 flex flex-col gap-2"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                borderRadius: "5px",
              }}
            >
              <h1 className="text-xl">Total Quiz Attempted</h1>
              <h1 className="text-4xl">32</h1>
            </div>
            <div
              className="pc:h-[8rem] pc:w-[15rem] bg-[rgb(252,251,247)] rounded-xl text-start px-7 py-4 flex flex-col gap-2"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                borderRadius: "5px",
              }}
            >
              <h1 className="text-xl">Total exp earned</h1>
              <h1 className="text-4xl">{userData && userData.totalExp}</h1>
            </div>
          </div>
          <div className="text-3xl mt-4">Recently Watched</div>
          {/* ongoing */}
          <div className=" flex flex-wrap">
            {userData &&
              userData.recentItems.map((item, index) => {
                const itemArr = item.split(" ");
                return (
                  <Link
                    to={`/${itemArr[0]}/${itemArr[1]}/${itemArr[2]}`}
                    onClick={() => setOpenedAccordion(itemArr[3])}
                    key={index}
                    className="hover:scale-105 transition-all duration-300 ease-in-out h-[5rem] w-1/3 bg-[#ffffff] mx-2 my-2 rounded-md border-r-[2px] border-l-[2px] border-[#a09f9f]"
                    style={{
                      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                    }}
                  >
                    <div className="h-full  cursor-pointer relative flex flex-col items-center justify-center">
                      <span className=" text-[#343232] text-[12px] text-center p-2 absolute -top-2 left-0">
                        {itemArr[2].split(/(?=[A-Z])/).join(" ")}
                      </span>
                      <span className=" text-[#343232] text-[18px] text-center">
                        {itemArr[3].split(/(?=[A-Z])/).join(" ")}
                      </span>
                      <LastSeen
                        time={item.split(" ").pop()}
                        className={
                          " text-[12px] text-[#343232] absolute right-2 bottom-1"
                        }
                      />
                    </div>
                  </Link>
                );
              })}
          </div>
          <div className="text-3xl mt-4">Completed Courses</div>
          {(userData && completedItems === undefined) ||
          completedItems?.length === 0 ? (
            <div>No Cources Completed Yet</div>
          ) : (
            <div className="flex flex-row flex-wrap justify-start gap-5 overflow-y-scroll">
              {userData &&
                userData.completedItems &&
                userData.completedItems.map((item, index) => {
                  if (item) {
                    const title = item.title.split(" ");
                    let inwhat;
                    let course;
                    if (userData.inWhat === "college") {
                      inwhat = userData.inWhat;
                      course = userData.collegestudent;
                    } else if ((userData.inWhat = "school")) {
                      inwhat = userData.inWhat;
                      course = userData.schoolstudent;
                    }

                    return (
                      <Tilt
                        key={index}
                        options={{ scale: 1 }}
                        style={{
                          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                          borderRadius: "5px",
                        }}
                      >
                        <Link to={`/${inwhat}/${course}/${title[0]}`}>
                          <div className="h-[5.5rem] w-[14rem] border-r-2 border-l-2 border-blue-300 rounded-[5px] flex flex-col px-2 items-center justify-around cursor-pointer">
                            <span className=" text-[12px]">
                              {title[1].split(/(?=[A-Z])/).join(" ")}
                            </span>
                            <span className=" text-[12px]">
                              {title[0].split(/(?=[A-Z])/).join(" ")}
                            </span>
                          </div>
                        </Link>
                      </Tilt>
                    );
                  } else {
                    return <div>Loading....</div>;
                  }
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
