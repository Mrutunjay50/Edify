import React, { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const navigate = useNavigate();
  const [schoolData, setSchoolData] = useState();
  const [collegeData, setCollegeData] = useState();

  return (
    <CourseContext.Provider value={{ collegeData, setCollegeData, schoolData, setSchoolData }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => {
  return useContext(CourseContext);
};