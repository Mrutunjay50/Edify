import { useEffect, useState } from "react";
import { Tilt } from "react-tilt";
import Zoom from "@mui/material/Zoom";
import { useAuth } from "../../CommonComps/LoginContext";
import { Link } from "react-router-dom";
import { useCourse } from "./courseContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllCourses from "./allCourses";
import Loading from "./Loading";
import apiurl from "../../utils";

const CoursesAccToClass = () => {
  const [course, setCourse] = useState(false);
  const [school, setSchool] = useState(undefined);
  const [college, setCollege] = useState(undefined);
  const { userData } = useAuth();
  const { collegeData, schoolData } = useCourse();

  const getSchoolData = () => {
    apiurl
      .get("/api/getschool")
      .then((response) => {
        const clams = response.data
          .filter((item) => item.classname === schoolData)
          .map((item) => item.subjects);
        setSchool(clams);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getCollegeData = () => {
    apiurl
      .get("/api/getcollege")
      .then((response) => {
        const clams = response.data
          .filter((item) => item.coursename === collegeData)
          .map((item) => item.subjects);
        setCollege(clams);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    setCourse(true);
    if (userData && userData.inWhat === "school" || schoolData) {
      setSchool(undefined)
      getSchoolData();
      setCollege(undefined)
      
    } else if (userData && userData.inWhat === "college" || collegeData) {
      setCollege(undefined);
      getCollegeData();
      setSchool(undefined)
    } 
  }, [schoolData, collegeData]); // Trigger the effect when userData changes
  return (
    <>
      {userData ? (
        <div>
          {collegeData || schoolData ? (
            userData && userData.inWhat === "school" ? (
              school && school[0] ? (
                <div className="flex flex-row laptop:mx-[4rem] overflow-x-auto overflow-y-hidden whitespace-nowrap rounded-2xl">
                  {school[0].map((item, index) => (
                    <Tilt key={index} options={{ scale: 1 }}>
                      <Zoom in={course}>
                        {schoolData === userData.schoolstudent ? (
                          <Link
                            to={`/school/${
                              userData.schoolstudent
                            }/${item.subjectname
                              .replaceAll(" ", "")
                              }`}
                          >
                            <div className="h-[13rem] w-[15rem] bgCourse  ml-4 rounded-2xl cursor-pointer shadow-lg shadow-slate-500 flex items-center justify-center">
                              <div className="overflow-hidden whitespace-break-spaces text-white/80 text-lg text-center">
                                {item.subjectname}
                              </div>
                            </div>
                          </Link>
                        ) : (
                          <div
                            className="h-[13rem] w-[15rem] bgCourse ml-4 rounded-2xl cursor-pointer shadow-lg shadow-slate-500 flex items-center justify-center"
                            onClick={() =>
                              toast.error(
                                "Access denied: Not accessible content."
                              )
                            }
                          >
                            <div className="overflow-hidden whitespace-break-spaces text-white/80 text-lg text-center">
                              {item.subjectname}
                            </div>
                          </div>
                        )}
                      </Zoom>
                    </Tilt>
                  ))}
                </div>
              ) : (
               <Loading/>
              )
            ) : (
              userData &&
              userData.inWhat === "college" &&
              (college && college[0] ? (
                <div className="flex flex-row laptop:mx-[4rem] overflow-x-auto overflow-y-hidden whitespace-nowrap rounded-2xl">
                  {college[0].map((item, index) => (
                    <Tilt key={index} options={{ scale: 1 }}>
                      <Zoom in={course}>
                        {collegeData === userData.collegestudent ? (
                          <Link
                            to={`/college/${userData.collegestudent}/${item.name.replaceAll(" ", "")}`}
                          >
                            <div className="h-[13rem] w-[15rem] bgCourse ml-4 rounded-2xl cursor-pointer shadow-lg shadow-slate-500 flex items-center justify-center">
                              <div className="overflow-hidden whitespace-break-spaces text-white/80 text-lg text-center">
                                {item.name}
                              </div>
                            </div>
                          </Link>
                        ) : (
                          <div
                            className="h-[13rem] w-[15rem] bgCourse ml-4 rounded-2xl cursor-pointer shadow-lg shadow-slate-500 flex items-center justify-center"
                            onClick={() =>
                              toast.error(
                                "Access denied: Not accessible content."
                              )
                            }
                          >
                            <div className="overflow-hidden whitespace-break-spaces text-white/80 text-lg text-center">
                              {item.name}
                            </div>
                          </div>
                        )}
                      </Zoom>
                    </Tilt>
                  ))}
                </div>
              ) : (
               <Loading/>
              ))
            )
          ) : (
            <AllCourses userData={userData || []} />
          )}
        </div>
      ) : (
        <div>
          {schoolData || collegeData ? (
            <div>
            {school || college ? (
                <div className="flex flex-row laptop:mx-[4rem] overflow-x-auto overflow-y-hidden whitespace-nowrap rounded-2xl">
                {college && college[0] && collegeData ? college[0].map((item, index) => (
                    <Tilt key={index} options={{ scale: 1 }}>
                      <Zoom in={course}>
                        
                          <div
                            className="h-[13rem] w-[15rem] bgCourse ml-4 rounded-2xl cursor-pointer shadow-lg shadow-slate-500 flex items-center justify-center"
                            onClick={() =>
                              toast.error(
                                "Access denied: Not accessible content."
                              )
                            }
                          >
                            <div className="overflow-hidden whitespace-break-spaces text-white/80 text-lg text-center">
                              {item.name}
                            </div>
                          </div>
                      </Zoom>
                    </Tilt>
                  )) : ""}
                  {school && school[0] && schoolData ? school[0].map((item, index) => (
                    <Tilt key={index} options={{ scale: 1 }}>
                      <Zoom in={course}>
                        
                          <div
                            className="h-[13rem] w-[15rem] bgCourse ml-4 rounded-2xl cursor-pointer shadow-lg shadow-slate-500 flex items-center justify-center"
                            onClick={() =>
                              toast.error(
                                "Access denied: Not accessible content."
                              )
                            }
                          >
                            <div className="overflow-hidden whitespace-break-spaces text-white/80 text-lg text-center">
                              {item.subjectname}
                            </div>
                          </div>
                        
                      </Zoom>
                    </Tilt>
                  )) : ""}
                </div>
              ) :  <Loading/>}
            </div>
            ) : <AllCourses userData={undefined}/>}
        </div>
      )}
    </>
  );
};

export default CoursesAccToClass;
