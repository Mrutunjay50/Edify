import React, { useEffect, useState } from "react";
import Tube from "./Youtube";
import { useAuth } from "../../CommonComps/LoginContext";
import LastSeen from "../ProfileComponent/LastSeen";
import MyPDFComponent from "./MyPDF";
import { useRanking } from "../ProfileComponent/RankingContext";
import apiurl from "../../utils";

const CollegeCourse = ({
  college,
  subject,
  testForm,
  Accordion,
  setClickedTube,
  isOpen,
  setIsOpen,
  toggleAccordion,
  handleVideoComplete,
}) => {
  const { userData, tokenId , setUserData} = useAuth();
  const [completedItems, setCompletedItems] = useState(undefined);
  const [recentItems, setRecentItems] = useState(undefined);
  const{ socket } = useRanking();

  useEffect(() => {
    setCompletedItems(userData?.completedItems);
    setRecentItems(userData?.recentItems);
    // console.log(completedItems, userData?.completedItems);
    // console.log(recentItems);
  }, [userData]);

  const handleClick = async (incrementValue) => {
    try {
      // Make a POST request to your backend route to update action scores
      const response = await apiurl.post("/updateActionScores",{
        userId: userData._id,
        incrementVal : incrementValue
      },
      {
        headers: {
          Authorization: `Bearer ${tokenId}`,
        },
      });
      const {user} = response.data;
      setUserData(user);
      socket.emit('actionScore' , {data : "send"})
    } catch (error) {
      console.error("Error updating action scores:", error);
      // Handle error response if needed
    }
  };

  function extractVideoId(url) {
    // Regular expression pattern to match YouTube video IDs
    var pattern =
      /(?:\?v=|\/embed\/|\/\d\/|\/vi?\/|\/e\/|watch\?v=|\/watch\?feature=player_embedded&v=|\/watch\?feature=player_embedded&list=PL|\/watch\?feature=player_embedded&index=|\/video\/|\/playlist\/|\/channels\/|\/user\/|\/user\/\w\/|\/v\/|\/e\?rel=0&feature=player_embedded&hl=|\/user\/\S#p\/a\/u\/1\/|\/FB\/\w\/|\/#\S\/\w\/)([^#\&\?]*).*/;

    var match = url.match(pattern);

    if (match && match[1]) {
      return match[1];
    } else {
      return null;
    }
  }

  return (
    <div>
      <div className="relative mt-[12%]">
        <span className="font-mono text-start ml-20 text-5xl">
          Let's take one step forward towards... <br />
        </span>
        <div className="ml-20 p-3 italic mb-10 mt-2 font-mono text-6xl text-[rgb(46,81,167)]">
          LEARNING!!
        </div>
      </div>
      <div className=" flex flex-col relative w-[90%] left-16 mb-8">
        {college &&
          college.videos &&
          college.videos.map((item, index) => (
            <div
              key={index}
              className="flex-[5] bg-[rgb(249,249,245)] mx-3 my-2 p-5 text-black/80 text-xl rounded-sm relative"
            >
              {recentItems?.map((recent, recentIndex) => {
                if (item.title.split(" ").join("") === recent.split(" ")[3]) {
                  return (
                    <span key={recentIndex}>
                      <LastSeen
                        time={recent.split(" ").pop()}
                        className={" text-[12px] absolute right-5"}
                      />
                    </span>
                  );
                }
              })}
              {completedItems?.map((complete, completeIndex) => {
                if (
                  item.title.split(" ").join("") ===
                  complete.title.split(" ")[1]
                ) {
                  return (
                    <span
                      key={completeIndex}
                      className="absolute left-5 top-1 text-[12px]"
                    >
                      (completed)
                    </span>
                  );
                }
              })}
              <Accordion
                title={item.title}
                setClickedTube={setClickedTube}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                index={index}
                toggleAccordion={toggleAccordion}
              >
                <div className="flex bg-white m-2 my-6 p-2 rounded-2xl cursor-pointer text-blue-600">
                  <div className="p-[10px] mr-[5rem] ml-10 rounded-lg shadow-black shadow-md mb-5 mt-4 w-[610px] h-[375px]">
                    <Tube
                      videoId={extractVideoId(item.url)}
                      handleVideoComplete={handleVideoComplete}
                      title={item.title}
                      subject={subject}
                      index={index}
                    />
                  </div>
                  <MyPDFComponent
                    subject={subject}
                    inwhat={"college"}
                    title={item.title}
                    handleClick={handleClick}
                  />
                </div>
              </Accordion>
            </div>
          ))}
        <div className=" flex flex-row justify-between items-center">
          <div
            onClick={() => handleClick(35)}
            className="bg-white m-2 px-4 py-2 text-lg rounded-lg cursor-pointer text-black/80 font-sans font-normal hover:bg-black/80 hover:text-white/80 shadow-xl"
          >
            Notes
          </div>
          {testForm ? (
            testForm
              ?.filter((item) => {
                if (
                  item.type.split(/(?=[A-Z])/)[0].toLowerCase() ===
                    userData.inWhat &&
                  item.course === userData.collegestudent &&
                  item.subject.replaceAll(/\s/g, "").toLowerCase() ===
                    subject.toLowerCase()
                ) {
                  return item;
                }
              })
              .map((itemForm, index) => {
                console.log(itemForm);
                return (
                  <a key={index} href={itemForm.url} target="_blank">
                    <div className=" w-[100%] bg-white mr-2 px-4 py-2 text-lg rounded-lg cursor-pointer text-black/80 font-sans font-normal hover:bg-black/80 hover-text-white/80 shadow-xl">
                      Take Tests
                    </div>
                  </a>
                );
              })
          ) : (
            <div
              className=" w-[100%] float-right bg-white mr-2 px-4 py-2 text-lg rounded-lg cursor-pointer text-black/80 font-sans font-normal hover-bg-black/80 hover-text-white/80 shadow-xl"
              onClick={() => {
                toast.error("There are no tests available.", {
                  position: "bottom-right",
                  autoClose: 3000,
                });
              }}
            >
              Take Tests
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollegeCourse;
