import React, { useState, useEffect } from "react";
import axios from "axios";

const ScoreUpdater = () => {
  const [school, setSchool] = useState([]);
  const [college, setCollege] = useState([]);
  const [course, setCourse] = useState([]);
  const [spreadSheetId, setSpreadSheetId] = useState(undefined);
  const [idGot, setIdGot] = useState(false);
  const [scoreData, setScoreData] = useState({
    inWhat: "",
    course: "",
    subject: "",
  });

  const getSchoolData = () => {
    axios
      .get("https://edify-backend-service.onrender.com/api/getschool")
      .then((response) => {
        const clams = response.data
          .filter((items) => items.classname === scoreData?.course)[0]
          ?.subjects?.map((item) => item.subjectname);
        const clams1 = response.data.map((item) => item.classname);
        setSchool(clams);
        setCourse(clams1);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getCollegeData = () => {
    axios
      .get("https://edify-backend-service.onrender.com/api/getcollege")
      .then((response) => {
        const clams = response.data
          .filter((items) => items.coursename === scoreData?.course)[0]
          ?.subjects?.map((item) => item.name);
        const clams1 = response.data.map((item) => item.coursename);
        setCollege(clams);
        setCourse(clams1);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setScoreData({ ...scoreData, [name]: value });
  };

  const getFormUrls = () => {
    fetch("https://edify-backend-service.onrender.com/api/fetchurl", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data, which contains form URLs
        // setTestForms(data);
        const some = data?.filter(
          (item) => item.subject === scoreData?.subject
        );
        setSpreadSheetId(some);
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  };


  const handleSheetData = () =>{
    const {inWhat, course, subject} = scoreData;
    axios
      .post("https://edify-backend-service.onrender.com/getScoreFromSheets", {inWhat, course, subject, spreadSheetId})
      .then((response) => {
        // Handle a successful response from the server, if needed
        console.log("Data sent successfully", response.data);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Error sending data", error);
      });
  }

  useEffect(() => {
    if (scoreData.inWhat === "college") {
      getCollegeData();
    } else if (scoreData.inWhat === "school") {
      getSchoolData();
    }
    getFormUrls();
  }, [scoreData]);

  console.log(spreadSheetId);

  return (
    <div className="mt-[14vh] min-h-[calc(100vh-14vh)]">
      <div className="py-[3vh] px-8 bg-[#d0d7ff65] font-mono min-h-[100vh] overflow-y-scroll w-[700px] relative left-[25%] rounded-md mt-[14vh] mb-4 border-2">
        <div>Update Score</div>
        <select
          className="rounded-md p-2 focus:outline-none text-[#2d2c2c] font-semibold mb-2 mr-4"
          name="inWhat"
          id=""
          onChange={handleChange}
        >
          <option value="">choose</option>
          <option value="college">college</option>
          <option value="school">school</option>
        </select>

        <select
          className="rounded-md p-2 focus:outline-none text-[#2d2c2c] font-semibold mb-2 mr-4"
          name="course"
          id=""
          onChange={handleChange}
        >
          <option value="">choose</option>
          <>
            {course.map((item, index) => (
              <option value={item}>{item}</option>
            ))}
          </>
        </select>

        <select
          name="subject"
          id=""
          onChange={handleChange}
          className="rounded-md p-2 focus:outline-none text-[#2d2c2c] font-semibold mb-2 mr-4"
        >
          <option value="">choose</option>
          {scoreData?.inWhat === "college" ? (
            <>
              {college?.map((item, index) => (
                <option value={item}>{item}</option>
              ))}
            </>
          ) : scoreData?.inWhat === "school" ? (
            <>
              {school?.map((item, index) => (
                <option value={item}>{item}</option>
              ))}
            </>
          ) : (
            ""
          )}
        </select>
        <div>
          <div> Id of the Spreadheet</div>
          <div className="w-full h-[30px] bg-white p-2 text-[22px] box-content flex items-center rounded-md mb-2">
            {spreadSheetId?.length > 0 ? (
              <span>{spreadSheetId[0].responseSheetName}</span>
            ) : (
              "Loading..."
            )}
          </div>
          <div className="w-full h-[30px] bg-white p-2 text-[22px] box-content flex items-center rounded-md">
            {spreadSheetId?.length > 0 ? (
              <span>{spreadSheetId[0].responseSheetId}</span>
            ) : (
              "Loading..."
            )}
          </div>
        </div>

        <div className=" flex flex-col mt-10">
          <input type="text" value={spreadSheetId?.length > 0 && spreadSheetId[0].responseSheetId} hidden />
          <div className="flex justify-between items-center">
          <div className="h-[6vh] bg-white p-3 rounded-md text-lg flex justify-center items-center cursor-pointer" onClick={handleSheetData}>UpdateScore Data</div>
          <div className="h-[6vh] bg-white p-3 rounded-md text-lg flex justify-center items-center cursor-pointer" onClick={() => setIdGot(!idGot)}>Get Sheet</div>
          </div>
          {spreadSheetId?.length > 0 && idGot && <div className="overflow-x-scroll overflow-y-hidden mt-10 h-[6vh] bg-white p-3 rounded-md text-lg flex justify-center items-center cursor-pointer"><a href={`https://docs.google.com/spreadsheets/d/${spreadSheetId?.length > 0 && spreadSheetId[0].responseSheetId}/edit`} target="_blank" rel="noopener noreferrer">https://docs.google.com/spreadsheets/d/{spreadSheetId?.length > 0 && spreadSheetId[0].responseSheetId}/edit</a></div>}
        </div>
      </div>
    </div>
  );
};

export default ScoreUpdater;
