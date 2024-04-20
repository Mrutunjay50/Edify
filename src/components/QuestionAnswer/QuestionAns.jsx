import React, { useState, useEffect } from "react";
import apiurl from "../utils.jsx";
import { Link, useRouteLoaderData } from "react-router-dom";
import { useAuth } from "../CommonComps/LoginContext.jsx";

const QuestionAns = ({teacher}) => {
  // State variables
  const [testData, setTestData] = useState(null);
  const {userData} = useAuth();

  console.log(userData);

  // Function to fetch test data
  useEffect(() => {
    const fetchTestData = async () => {
      try {
        let response;
        if (teacher) {
          response = await apiurl.get("/get-alltest");
        } else {
          const { schoolstudent, collegestudent } = userData;
          response = await apiurl.get(`/get-alltest?school=${schoolstudent}&course=${collegestudent}`);
        }
        setTestData(response.data);
      } catch (error) {
        console.error("Error fetching test data:", error);
      }
    };

    fetchTestData();
  }, [userData, teacher]);

  // Render loading if test data is not yet fetched
  if (!testData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#D9D5C6] min-h-screen py-8 font-sans mt-[12vh] font-playpen">
      <div className="container mx-auto w-[700px] p-8 bg-[#fbfcfc] rounded-lg shadow-md overflow-scroll overflow-x-hidden min-h-[100vh]">
        <h2 className="text-2xl font-bold text-center mb-4 text-[#263B66]">All Tests</h2>
        {testData.map((question, index) => (
          <Link
            to={`/testQuestions/${question._id}`}
            key={index}
            className="block mb-3 rounded-sm px-3 py-2 bg-[#e48444b4] hover:bg-[#253e70c8] text-white"
          >
            <p>{`${question.questionType} questions on ${question.classes}${question.course} [ --> ${question.subject} <-- ]`}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuestionAns;
