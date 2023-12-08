import React, { useState, useEffect } from "react";
import Tube from "./Youtube";
import { useAuth } from "../../CommonComps/LoginContext";
import LastSeen from "../ProfileComponent/LastSeen";
import MyPDFComponent from "./MyPDF";
import axios from "axios";
import { useRanking } from "../ProfileComponent/RankingContext";

const SchoolCourse = ({
  school,
  Accordion,
  isOpen,
  setIsOpen,
  toggleAccordion,
  subject,
  setClickedTube,
  handleVideoComplete,
  testForm
}) => {
  const { userData, setUserData, tokenId } = useAuth();
  const [completedItems, setCompletedItems] = useState(undefined);
  const [recentItems, setRecentItems] = useState(undefined);
  const{ socket } = useRanking();

  useEffect(() => {
    setCompletedItems(userData?.completedItems);
    setRecentItems(userData?.recentItems);
  }, [userData]);



  const handleClick = async (incrementValue) => {
    try {
      // Make a POST request to your backend route to update action scores
      const response = await axios.post("https://edify-backend-service.onrender.com/updateActionScores",{
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
      <div className="relative mt-[14vh] laptop:mt-[12%]">
        <span className="font-mono text-start mx-8 laptop:mx-20 text-2xl tablet:text-3xl pc:text-5xl">
          Let's take one step forward towards... <br />
        </span>
        <div className="mx-8 laptop:mx-20 p-3 italic mb-10 mt-2 font-mono text-6xl text-[rgb(46,81,167)]">
          LEARNING!!
        </div>
      </div>
      <div className=" flex flex-col relative w-[100%] justify-center items-center mb-8 px-2 tablet:px-12">
        {school &&
          school.chapter &&
          school.chapter.map((item, index) => (
            <div
              key={index}
              className="flex-[5] w-full bg-[rgb(249,249,245)] mx-3 my-2 p-5 text-black/80 text-xl rounded-sm relative"
            >
              {recentItems?.map((recent, recentIndex) => {
                if (
                  item.chaptername.split(" ").join("") === recent.split(" ")[3]
                ) {
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
                  item.chaptername.split(" ").join("") === complete.title.split(" ")[1]
                ) {
                  return (
                    <span key={completeIndex} className="absolute left-5 top-1 text-[12px]">
                    (completed)
                    </span>
                  );
                }
              })}
              <Accordion
                title={item.chaptername}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                index={index}
                toggleAccordion={toggleAccordion}
                setClickedTube={setClickedTube}
              >
                {item.videos.map((items, index) => (
                  <div
                    key={index}
                    className="flex flex-col laptop:flex-row bg-white m-2 my-6 p-2 rounded-2xl cursor-pointer text-blue-600"
                  >
                    {/* Left-VideoSection */}
                    <div className=" p-2 pc:p-4 mr-[5rem] pc:ml-10 rounded-lg shadow-black shadow-md mb-5 pc:mt-4 pc:w-[610px] h-[250px] pc:h-[375px]">
                      <Tube
                        videoId={extractVideoId(items.url)}
                        handleVideoComplete={handleVideoComplete}
                        title={item.chaptername}
                        subject={subject}
                      />
                    </div>
                    {/* right-NoteSection */}
                    <MyPDFComponent subject={subject} inwhat={school} title={item.chaptername} handleClick={handleClick}/>
                  </div>
                ))}
                <div className=" flex flex-row justify-between items-center">
                  <div onClick={() => handleClick(35)} className="bg-white m-2 px-4 py-2 text-lg rounded-lg cursor-pointer text-black/80 font-sans font-normal hover:bg-black/80 hover:text-white/80 shadow-xl">
                    Notes
                  </div>
                </div>
              </Accordion>
            </div>
          ))}
        {testForm ? (
          testForm
            .filter((item) => {
              if (
                item.type.split(/(?=[A-Z])/)[0].toLowerCase() === userData.inWhat &&
                item.course === userData.schoolstudent &&
                item.subject.replaceAll(/\s/g, "").toLowerCase() === subject.toLowerCase()
              ) {
                return item;
              }
            })
            .map((itemForm, index) => (
              <a key={index} href={itemForm.url} target="_blank">
                <div className=" w-[10%] text-center bg-white float-right  mr-2 px-4 py-2 text-lg rounded-lg cursor-pointer text-black/80 font-sans font-normal hover:bg-black/80 hover-text-white/80 shadow-xl">
                  Take Tests
                </div>
              </a>
            ))
        ) : (
          <div
            className=" w-[100%] bg-white mr-2 px-4 py-2 text-lg rounded-lg cursor-pointer text-black/80 font-sans font-normal hover-bg-black/80 hover-text-white/80 shadow-xl"
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
  );
};

export default SchoolCourse;
