import React, { useState, useEffect } from "react";
import axios from "axios";

const ScoreUpdater = () => {
  const [school, setSchool] = useState([]);
  const [college, setCollege] = useState([]);

  const getSchoolData = () => {
    axios
      .get("http://localhost:8800/api/getschool")
      .then((response) => {
        const clams = response.data
          .filter((items) => items.classname === testData.classes)[0]
          ?.subjects?.map((item) => item.subjectname);
        setSchool(clams);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const getCollegeData = () => {
    axios
      .get("http://localhost:8800/api/getcollege")
      .then((response) => {
        const clams = response.data
          .filter((items) => items.coursename === testData.course)[0]
          ?.subjects?.map((item) => item.name);
        setCollege(clams);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getSchoolData();
    getCollegeData();
  }, []);


  return (
    <div></div>
  )
}

export default ScoreUpdater