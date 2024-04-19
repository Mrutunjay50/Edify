import React, { useState, useEffect } from "react";
import apiurl from "../utils.jsx";
import { Link } from "react-router-dom";

const QuestionAns = () => {
  // State variables
  const [testData, setTestData] = useState(null);

  // Function to fetch test data
  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const response = await apiurl.get("/get-alltest");
        setTestData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching test data:", error);
      }
    };

    fetchTestData();
  }, []);

  // Render loading if test data is not yet fetched
  if (!testData) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" py-[3vh] font-playpen text-center px-8 font-mono min-h-[100vh] overflow-y-scroll w-[700px] relative left-[25%] rounded-md mt-[14vh] mb-4 border-2">
      <h2 className="text-2xl font-bold mb-4">All Tests</h2>
      <h3 className="text-xl font-semibold mb-4">{testData.subject}</h3>
      {testData.map((question, index) => (
        <Link to={`/testQuestions/${question._id}`} key={index} className="mb-3 rounded-sm px-3 py-1 bg-[#2f14a9ad] flex justify-start font-playpen text-[#ffffff] items-center">
          <p className="mb-2">{`${question.questionType} questions on ${question.classes}${question.course}  ${question.subject}`}</p>
        </Link>
      ))}
    </div>
  );
};

export default QuestionAns;
