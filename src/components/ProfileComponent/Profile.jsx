import ProNavbar from "./ProNavbar";
import { useAuth } from "../CommonComps/LoginContext";
import LastSeen from "./LastSeen";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProfileImage from "./ProfileImage";
import { Tilt } from "react-tilt";
import { Zoom } from "@mui/material";

const Profile = () => {
  const { userData } = useAuth();
  const [completedItems, setCompletedItems] = useState(undefined);
  // const [openedAccordion, setOpenedAccordion] = useState(null);

  useEffect(() => {
    setCompletedItems(userData?.completedItems);
    // console.log(completedItems, userData?.completedItems);
  }, [userData]);

  return (
    <div className="h-full flex flex-row items-start mb-10">
      <ProNavbar className={"sticky top-[15%] ml-3 mb-52 w-full h-full"} />
      {/* left */}
      <div className="relative -left-[3.8rem] h-[88vh] w-[30rem] mt-[6rem] border-r-[0.1px] pt-5 border-r-black/60 ml-3">
        <ProfileImage
          userData={userData}
          className={`flex flex-col gap-2 bg-white mt-4 mr-[30px]`}
        />
      </div>
      {/* right */}
      <div className="mt-28 bg-white h-[100%] w-[54vw] mb-10 pr-14">
        <div className="flex flex-col gap-4 mt-3 -ml-4">
          <div className="text-3xl mt-2">Achievements</div>
          {/* circles */}
          <div className="flex flex-row justify-start gap-10 mb-4">
            <div className="h-20 w-20 rounded-full bg-gradient-to-r from-[#313e88] to-blue-500"></div>
            <div className="h-20 w-20 rounded-full bg-gradient-to-r from-[#313e88] to-blue-500"></div>
            <div className="h-20 w-20 rounded-full bg-gradient-to-r from-[#313e88] to-blue-500"></div>
            <div className="h-20 w-20 rounded-full bg-gradient-to-r from-[#313e88] to-blue-500"></div>
          </div>
          {/* tracks */}
          <div className="flex flex-row gap-2 justify-start">
            <div className="h-[8rem] w-[15rem] bg-[rgb(242,241,236)] rounded-xl text-start pl-7 pt-4 flex flex-col gap-2">
              <h1 className="text-xl">Weekly Rank</h1>
              <h1 className="text-4xl">1st</h1>
            </div>
            <div className="h-[8rem] w-[15rem] bg-[rgb(242,241,236)] rounded-xl text-start pl-7 pt-4 flex flex-col gap-2">
              <h1 className="text-xl">Total Quiz Attempted</h1>
              <h1 className="text-4xl">32</h1>
            </div>
            <div className="h-[8rem] w-[15rem] bg-[rgb(242,241,236)] rounded-xl text-start pl-7 pt-4 flex flex-col gap-2">
              <h1 className="text-xl">Total ex earned</h1>
              <h1 className="text-4xl">1200+</h1>
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
                    to={`/Edify/${itemArr[0]}/${itemArr[1]}/${itemArr[2]}`}
                    onClick={() => setOpenedAccordion(itemArr[3])}
                    key={index}
                    className="hover:scale-105 transition-all duration-300 ease-in-out h-[5rem] w-1/3 bg-[#ffffff] mx-2 my-2 rounded-md border-r-[2px] border-l-[2px] border-[#a09f9f]"
                    style={{
                      boxShadow: "-3px 3px 8px #c5c5c5,-3px -3px  8px #ffffff",
                    }}
                  >
                    <div
                      
                      className="h-full  cursor-pointer relative flex flex-col items-center justify-center"
                    >
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
            <div className="flex flex-row flex-wrap justify-start gap-5">
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
                      <Tilt key={index} options={{ scale: 1 }}
                      style={{
                          boxShadow:
                            "-3px 3px 8px #c5c5c5,-3px -3px  8px #dddbdb",
                          borderRadius: "5px",
                        }}>
                      <Link
                        to={`/Edify/${inwhat}/${course}/${title[0]}`}
                        
                      >
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