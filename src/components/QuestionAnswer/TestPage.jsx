import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import apiurl from "../utils.jsx";

const TestPage = ({ teacher }) => {
  const { id } = useParams();
  const [testData, setTestData] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const fetchTestData = async () => {
      try {
        const response = await apiurl.get(`/get-one-test/${id}`);
        if (isMounted) {
          setTestData(response.data);
        }
      } catch (error) {
        console.error("Error fetching test data:", error);
      }
    };

    if (id) {
      fetchTestData();
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleSubmit = () => {
    let newScore = 0;
    testData.questions.forEach((question, index) => {
      if (answers[index] === question.correctOption) {
        newScore++;
      }
    });
    setScore(newScore);
  };

  const handleAnswerSelect = (index, option) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [index]: option,
    }));
  };

  if (!testData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-purple-50 min-h-screen py-8 font-sans">
      <div className="container mx-auto w-[700px] p-8 mt-[12vh] bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-8 text-purple-800">
          Test Page
        </h2>
        <h3 className="text-2xl font-semibold mb-8 text-purple-800">
          {testData.subject} {testData.course}
          {testData.classes}
        </h3>
        {testData.questions
          .filter((question) => question.prompt.trim() !== "") // Filter out questions with empty prompts
          .map((question, index) => (
            <div key={index} className="mb-6">
              <p className="text-lg mb-4 text-purple-900">
                <b>{index + 1}.</b> {question.prompt}
              </p>
              {question.options.map((option, optionIndex) => (
                <label
                  key={optionIndex}
                  className="block mb-2 pl-5 text-purple-700 cursor-pointer bg-purple-50 rounded-sm py-[2px]"
                >
                  <input
                    type="radio"
                    name={`question_${index}`}
                    value={option}
                    onChange={() =>
                      handleAnswerSelect(index, `option${optionIndex + 1}`)
                    }
                    className="mr-2 cursor-pointer"
                  />
                  {option}
                </label>
              ))}
            </div>
          ))}
        {!teacher && (
          <div className="text-center">
            <button
              onClick={handleSubmit}
              className="bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700 focus:outline-none"
            >
              Submit Answers
            </button>
            <p className="mt-4 text-lg text-purple-800">Score: {score}</p>
          </div>
        )}
        {teacher && (
          <div className="text-center mt-8">
            <Link
              to={`/edit-test/${id}`}
              className="bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700 focus:outline-none"
            >
              Edit Test
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestPage;
