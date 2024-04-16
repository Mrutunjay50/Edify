import React, { useState, useEffect } from "react";
import apiurl from "../utils.jsx";

const QuestionAns = () => {
  // State variables
  const [testData, setTestData] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);

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

  // Function to handle answer submission
  const handleSubmit = () => {
    // Calculate the score
    let newScore = 0;
    testData.questions.forEach((question, index) => {
      if (answers[index] === question.correctOption) {
        newScore++;
      }
    });
    setScore(newScore);
  };

  // Function to handle selecting an answer
  const handleAnswerSelect = (index, option) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [index]: option,
    }));
  };

  // Render loading if test data is not yet fetched
  if (!testData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Test Page</h2>
      <h3 className="text-xl font-semibold mb-4">{testData.subject}</h3>
      {testData.map((question, index) => (
        <div key={index} className="mb-6">
          <p className="mb-2">jkdhnfvkjdbfkgvb</p>
          
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit Answers
      </button>
      <p className="mt-4">Score: {score}</p>
    </div>
  );
};

export default QuestionAns;
