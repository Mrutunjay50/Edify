import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../CommonComps/LoginContext"; // Replace with the actual auth library import
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCourse } from "./courseContext";

function ClassSecComp() {
  const [activeSubHead, setActiveSubHead] = useState();
  const [school, setSchool] = useState([]);
  const [college, setCollege] = useState([]);
  const { userData } = useAuth();
  const { setCollegeData, setSchoolData, collegeData, schoolData } = useCourse();
  const [allClasses, setAllClasses] = useState([]);

  function filterNumbersByRange(numbers, min, max) {
    return numbers.filter((number) => number >= min && number <= max);
  }

  function getSchoolData() {
    axios
      .get("http://localhost:8800/api/getschool")
      .then((response) => {
        const classNames = response.data.flatMap((item) => item.classname);
        setSchool(classNames);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getCollegeData() {
    axios
      .get("http://localhost:8800/api/getcollege")
      .then((response) => {
        const courseNames = response.data.flatMap((item) => item.coursename);
        setCollege(courseNames);
      })
      .catch((error) => {
        console.log(error);
      });
  }


  useEffect(() => {
    getSchoolData();
    getCollegeData();
  }, []);
  useEffect(() => {
    setAllClasses([...school, ...college]);
  }, [school, college]);

  const renderClasses = (range) => (
    userData ? <div className="h-[3rem] w-[88%] mx-10 tablet:mx-0 tablet:ml-20 rounded-lg flex flex-row justify-start gap-5 tablet:gap-36">
    {range.map((item, index) => (
      <div
        key={index}
        onClick={() => {setSchoolData(item)}}
        className={`flex flex-row justify-around  h-[2.2rem] w-[5rem] rounded-xl items-center mt-1 ${
          userData &&
          userData.schoolstudent &&
          userData.schoolstudent === item
            ? "bg-black/20"
            : "bg-black/5"
        } hover:bg-black/10 cursor-pointer ${item === schoolData ? "bg-gradient-to-r from-[#313e88] to-blue-500 text-white" : "bg-black/5"}`}
      >
        {userData &&
        userData.schoolstudent &&
        userData.schoolstudent === item ? (
          <h1
            className="text-sm"
            onClick={() => {
              toast.info(
                "click on the below Subjects to access the contents"
              );
            }}
          >
            {item}
          </h1>
        ) : (
          <h1 className="text-sm">{item}</h1>
        )}
      </div>
    ))}
  </div> : <div className="h-[3rem] w-[88%] mx-10 tablet:mx-0 tablet:ml-20 rounded-lg flex flex-row justify-start gap-5 tablet:gap-36">
      {range.map((item, index) => (
        <div
          key={index}
          onClick={() => {setSchoolData(item); setCollegeData(undefined)}}
          className={`flex flex-row justify-around  h-[2.2rem] w-[5rem] rounded-xl items-center mt-1 hover:bg-black/10 cursor-pointer ${item === schoolData ? "bg-gradient-to-r from-[#313e88] to-blue-500 text-white" : "bg-black/5"}`}
        >
            <div>
              <h1 className="text-sm">{item}</h1>
            </div>
          
        </div>
      ))}
    </div>
  );




  const renderUniversityClasses = () => (
    userData ? <div className="h-[3rem] w-[88%] mx-10 tablet:mx-0 tablet:ml-20 rounded-lg flex flex-row justify-start gap-5 tablet:gap-36">
    {college.map((item, index) => (
      <div
        key={index}
        onClick={() => setCollegeData(item)}
        className={`flex flex-row justify-around  h-[2.2rem] w-[5rem] rounded-xl items-center mt-1 ${
          userData &&
          userData.collegestudent &&
          userData.collegestudent.trim().toLowerCase() ===
            item.trim().toLowerCase()
            ? "bg-black/20"
            : ""
        } hover-bg-black/10 cursor-pointer ${item === collegeData ? "bg-gradient-to-r from-[#313e88] to-blue-500 text-white" : "bg-black/5"} `}
      >
        {userData &&
        userData.collegestudent &&
        userData.collegestudent.trim().toLowerCase() ===
          item.trim().toLowerCase() ? (
          <div>
            <h1 className="text-sm">{item}</h1>
          </div>
        ) : (
          <h1 className="text-sm">{item}</h1>
        )}
      </div>
    ))}
  </div> : <div className="h-[3rem] w-[88%] mx-10 tablet:mx-0 tablet:ml-20 rounded-lg flex flex-row justify-start gap-5 tablet:gap-36">
      {college.map((item, index) => (
        <div
          key={index}
          onClick={() => {setCollegeData(item); setSchoolData(undefined)}}
          className={`flex flex-row justify-around  h-[2.2rem] w-[5rem] rounded-xl items-center mt-1  bg-black/10 cursor-pointer ${item === collegeData ? "bg-gradient-to-r from-[#313e88] to-blue-500 text-white" : "bg-black/5"}`}
        >
            <div>
              <h1 className="text-sm">{item}</h1>
            </div>
        </div>
      ))}
    </div>
  );

  const subHeadClick = (subHead) => {
    setActiveSubHead(subHead);
  };

  return (
    <>
      {userData ? (
        <div className="flex flex-col gap-4 mb-5">
          <ToastContainer />
          <h2 className="text-[1.5rem] tablet:text-[2.5rem] font-sans mx-10 tablet:mx-0 tablet:ml-20">Explore Our Courses</h2>
          {userData && userData.inWhat === "school" && (
            <div className="h-[3rem] w-[88%] mx-10 tablet:mx-0 tablet:ml-20 bg-white rounded-lg flex flex-row justify-start laptop:gap-36">
              {["6-8", "9-10", "11-12"].map((range) => (
                <div
                  key={range}
                  className={`flex flex-row justify-around bg-white h-[2.5rem] w-[6rem] rounded-xl items-center mt-1 hover:bg-black/10 cursor-pointer ${
                    activeSubHead === range ? "bg-black/10" : ""
                  }`}
                  onClick={() => subHeadClick(range)}
                >
                  <h1 className="text-sm">{range}</h1>
                </div>
              ))}
            </div>
          )}

          {userData && userData.inWhat === "college" && (
            <div className="h-[3rem] w-[88%] mx-10 tablet:mx-0 tablet:ml-20 bg-white rounded-lg flex flex-row justify-start pc:gap-36">
              <div
                key="University"
                className={`flex flex-row justify-around bg-white h-[2.5rem] w-[6rem] rounded-xl items-center mt-1 hover:bg-black/10 cursor-pointer ${
                  activeSubHead === "University" ? "bg-black/10" : ""
                }`}
                onClick={() => subHeadClick("University")}
              >
                <h1 className="text-sm">University</h1>
              </div>
            </div>
          )}
          {userData &&
            userData.inWhat === "school" &&
            activeSubHead === "6-8" &&
            renderClasses(filterNumbersByRange(allClasses, 6, 8))}
          {userData &&
            userData.inWhat === "school" &&
            activeSubHead === "9-10" &&
            renderClasses(filterNumbersByRange(allClasses, 9, 10))}
          {userData &&
            userData.inWhat === "school" &&
            activeSubHead === "11-12" &&
            renderClasses(filterNumbersByRange(allClasses, 11, 12))}
          {userData &&
            userData.inWhat === "college" &&
            activeSubHead === "University" &&
            renderUniversityClasses()}
        </div>
      ) : (
        <div>
        <h2 className=" text-[1.5rem] tablet:text-[2.5rem] font-sans mx-10 tablet:mx-0 tablet:ml-20">Explore Our Courses</h2>
          <div className="pc:h-[3rem] pc:w-[88%] tablet:ml-16 pc:ml-20 bg-white rounded-lg flex laptop:flex-row justify-start laptop:gap-36">
            {["6-8", "9-10", "11-12", "University"].map((range) => (
              <div
                key={range}
                className={`flex flex-row justify-around bg-white h-[2.5rem] w-[6rem] rounded-xl items-center mt-1 hover:bg-black/10 cursor-pointer `}
                onClick={() => subHeadClick(range)}
              >
                <h1 className="text-sm">{range}</h1>
              </div>
            ))}
          </div>
          {activeSubHead === "6-8" &&
            renderClasses(filterNumbersByRange(allClasses, 6, 8))}
          {activeSubHead === "9-10" &&
            renderClasses(filterNumbersByRange(allClasses, 9, 10))}
          {activeSubHead === "11-12" &&
            renderClasses(filterNumbersByRange(allClasses, 11, 12))}
          {activeSubHead === "University" && renderUniversityClasses()}
        </div>
      )}
    </>
  );
}

export default ClassSecComp;
