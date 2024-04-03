import { useEffect, useState } from "react";
import { Tilt } from "react-tilt";
import Zoom from "@mui/material/Zoom";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Loading";
import apiurl from "../../utils";

const AllCourses = ({userData}) => {
    const [course, setCourse] = useState(false);
    const [school, setSchool] = useState([]);
    const [college, setCollege] = useState([]);
    const [allCourses, setAllCourses] = useState(undefined);
    
  
    const getSchoolData = () => {
      apiurl
        .get("/api/getschool")
        .then((response) => {
          const clams = response.data.flatMap((item) =>
            item.subjects.map((subject) => subject.subjectname)
          );
          setSchool([...new Set(clams)]);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    const getCollegeData = () => {
      apiurl
        .get("/api/getcollege")
        .then((response) => {
          const clams = response.data.flatMap((item) =>
            item.subjects.map((subject) => subject.name)
          );
          setCollege([...new Set(clams)]);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    useEffect(() => {
        setCourse(true);
          getSchoolData();
          getCollegeData();
      }, []);
    
      useEffect(() => {
        if(userData?.inWhat === "college") {
          setAllCourses([...college])
        }else if(userData?.inWhat === "school"){
          setAllCourses([...school])
        }
        else if (school.length > 0 && college.length > 0 && userData === undefined) {
          setAllCourses([...school, ...college]);
        }
      }, [school, college]);
  return (
    <div>
    <ToastContainer/>
        {allCourses ? (
            <div  className=" font-mono flex flex-row laptop:mx-[4rem] overflow-x-auto overflow-y-hidden whitespace-nowrap rounded-2xl">
                {allCourses.map((item,index) => (
                    <Tilt key={index} options={{ scale: 1 }} >
                    <Zoom in={course}>
                    {userData ? 
                        <div onClick={ () =>  toast.info("click on Your Course section to access your content")} className="h-[13rem] w-[15rem] bg-gradient-to-t from-[#290f41] to-[#3209a3] ml-4 rounded-2xl cursor-pointer shadow-lg shadow-slate-500 flex items-center justify-center">
                            <div className="overflow-hidden whitespace-break-spaces text-white/80 text-lg text-center">{item}</div>
                        </div> :
                        <div onClick={ () =>  toast.error("Access denied: Login to access the content.")} className="h-[13rem] w-[15rem] bg-[rgb(40,59,102)] ml-4 rounded-2xl cursor-pointer shadow-lg shadow-slate-500 flex items-center justify-center">
                            <div className="overflow-hidden whitespace-break-spaces text-white/80 text-lg text-center">{item}</div>
                        </div> 
                    }
                    </Zoom>
                    </Tilt>
                ))}
            </div>
        ) : (
          <Loading/>
        )}
    </div>
  )
}

export default AllCourses