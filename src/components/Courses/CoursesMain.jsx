import Box from "@mui/material/Box";
import ClassSection from "./ClassSection";
import CoursesAccToClass from "./CoursesAccToClass";
import { CourseProvider } from "./courseContext";
import { useEffect, useState } from "react";
import { Tilt } from "react-tilt";
import Zoom from "@mui/material/Zoom";
import axios from "axios";
import { useAuth } from "../CommonComps/LoginContext";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const CoursesMain = () => {
  const { userData } = useAuth();
  const [course, setCourse] = useState();
  const [soo, setSoo] = useState(false);

  const getCourseData = (inwhat) => {
    if (inwhat === "school") {
      axios
        .get("http://localhost:8800/api/getschool")
        .then((response) => {
          const clams = response.data
            .filter((item) => item.classname === userData?.schoolstudent)
            .map((item) => item.subjects);
          setCourse(clams);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else if (inwhat === "college") {
      axios
        .get("http://localhost:8800/api/getcollege")
        .then((response) => {
          const clams = response.data
            .filter((item) => item.coursename === userData?.collegestudent)
            .map((item) => item.subjects);
          setCourse(clams);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (userData) {
      setSoo(true);
      getCourseData(userData?.inWhat);
    }
  }, [userData]);

  return (
    <>
      <Box sx={{ height: 480 }}>
        <CourseProvider>
          <div className="relative mt-32 flex flex-col justify-center font-playpen">
            <ClassSection />
            <CoursesAccToClass />
          </div>
        </CourseProvider>
      </Box>

      <div className="laptop:mx-[4rem] mb-10 -mt-5">
        {userData ? <>
          <div className=" font-playpen text-[20px] mx-4 mb-4">YourCourses</div>
        <div className="flex flex-row  overflow-x-auto overflow-y-hidden whitespace-nowrap rounded-2xl">
          {course ?
            course[0].map((item, index) => (
              <Tilt key={index} options={{ scale: 1 }}>
                <Zoom in={soo}>
                  {userData && userData.inWhat === "school" ? (
                    <Link
                      to={`/school/${userData.schoolstudent}/${item.subjectname
                        .replaceAll(" ", "")}`}
                    >
                      <div className="h-[13rem] w-[15rem] bgCourse ml-4 rounded-2xl cursor-pointer shadow-lg shadow-slate-500 flex items-center justify-center">
                        <div className="overflow-hidden whitespace-break-spaces text-white/80 text-lg text-center">
                          {item.subjectname}
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <Link
                      to={`/college/${userData.collegestudent}/${item.name
                        .replaceAll(" ", "")}`}
                    >
                      <div className="h-[13rem] w-[15rem] bgCourse ml-4 rounded-2xl cursor-pointer shadow-lg shadow-slate-500 flex items-center justify-center">
                        <div className="overflow-hidden whitespace-break-spaces text-white/80 text-lg text-center">
                          {item.name}
                        </div>
                      </div>
                    </Link>
                  )}
                </Zoom>
              </Tilt>
            )) : <Loading message="please wait patiently"/>}
        </div>
        </> : <div className=" font-playpen text-center -mt-20 mb-10">"Join to get your own personalised Course"</div>}
      </div>
    </>
  );
};

export default CoursesMain;
