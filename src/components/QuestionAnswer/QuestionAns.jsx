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
    <div className="bg-purple-50 min-h-screen py-8 font-sans mt-[12vh]">
      <div className="container mx-auto w-[700px] p-8 bg-white rounded-lg shadow-md overflow-scroll overflow-x-hidden min-h-[100vh]">
        <h2 className="text-2xl font-bold text-center mb-4 text-purple-800">All Tests</h2>
        {testData.map((question, index) => (
          <Link to={`/testQuestions/${question._id}`} key={index} className="block mb-3 rounded-sm px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white">
            <p>{`${question.questionType} questions on ${question.classes}${question.course} ${question.subject}`}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuestionAns;
