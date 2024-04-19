import React, { useState, useEffect } from "react";
import apiurl from "../utils.jsx";
import MCQQuestion from "./MCQQuestion";
import { useAuth } from "../CommonComps/LoginContext";

const TestCreationSheet = () => {
  const [school, setSchool] = useState([]);
  const {userData, tokenId} = useAuth();
  const [college, setCollege] = useState([]);
  const [noOfQuestions, setNoOfQuestions] = useState(10);
  const [questions, setQuestions] = useState([]);
  const [testData, setTestData] = useState({
    courseType: "",
    questionType: "",
    subject: "",
    classes: "",
    course: "",
  });

  console.log(userData)

  const getSchoolData = () => {
    apiurl
      .get("/api/getschool")
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
    apiurl
      .get("/api/getcollege")
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
  }, [testData.classes, testData.course]);

  useEffect(() => {
    setQuestions(Array(parseInt(noOfQuestions)).fill({ prompt: "", options: ["", "", "", ""], correctOption: "" }));
  }, [noOfQuestions]);

  const handleAllChange = (e) => {
    const { name, value } = e.target;
    setTestData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleQuestionChange = (index, updatedQuestion) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index] = updatedQuestion;
      return updatedQuestions;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userData && userData._id) {
      try {
        const testDataToSend = {
          ...testData,
          testBy: userData._id,
          questions: questions
        };
        const response = await apiurl.post('/create-test', testDataToSend, {
          headers: {
            Authorization: `Bearer ${tokenId}`,
            'Content-Type': 'application/json; charset=UTF-8'
          }
        });
        console.log("Test data sent successfully:", response.data);
      } catch (error) {
        console.error("Error sending test data:", error);
      }
    }
  };
  

  return (
    <div className="bg-purple-50 min-h-screen py-8 px-8 font-mono overflow-y-scroll w-[700px] relative left-[25%] rounded-md mt-[14vh] mb-4 border-2">
      <div className="text-center font-semibold mb-4 text-purple-800">
        Create Test Form
      </div>
      <select
        className="rounded-md p-2 focus:outline-none text-purple-800 font-semibold mb-2 mr-4"
        name="courseType"
        onChange={handleAllChange}
      >
        <option value="">choose</option>
        <option value="school">school</option>
        <option value="college">college</option>
      </select>

      <select className="rounded-md p-2 focus:outline-none text-purple-800 font-semibold mb-2" name="questions" onChange={(e) => setNoOfQuestions(e.target.value)}>
        <option value="0">no. of questions</option>
        <option value="10">10</option>
        <option value="25">25</option>
      </select>

      <br />
      {testData.courseType === "school" && (
        <div>
          <label htmlFor="class" className="text-purple-800">Choose Class :</label>
          <select
            className="rounded-md p-2 focus:outline-none text-purple-800 font-semibold mb-2"
            name="classes"
            onChange={handleAllChange}
          >
            <option value="">class</option>
            <option value="6">6th</option>
            <option value="7">7th</option>
            <option value="8">8th</option>
            <option value="9">9th</option>
            <option value="10">10th</option>
            <option value="11">11th</option>
            <option value="12">12th</option>
          </select>
          <label htmlFor="subject" className="text-purple-800">Choose Subject :</label>
          <select
            className="rounded-md p-2 focus:outline-none text-purple-800 font-semibold mb-2"
            name="subject"
            onChange={handleAllChange}
          >
            <option value="">Subject</option>
            {school?.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>

          <br />
          <select
            className="rounded-md p-2 focus:outline-none text-purple-800 font-semibold"
            name="questionType"
            onChange={handleAllChange}
          >
            <option value="">questionType</option>
            <option value="mcq">MCQ</option>
            <option value="shortanswer">ShortAnswer</option>
          </select>
        </div>
      )}
      {testData.courseType === "college" && (
        <div className="">
          <label htmlFor="course" className="text-purple-800">Choose Course :</label>
          <select
            className="rounded-md p-2 focus:outline-none text-purple-800 font-semibold"
            name="course"
            onChange={handleAllChange}
          >
            <option value="">Course</option>
            <option value="Btech">Btech</option>
            <option value="Bsc">Bsc</option>
          </select>
          <br />
          <label htmlFor="subject" className="text-purple-800">Choose Subject :</label>
          <select
            className="rounded-md p-2 focus:outline-none text-purple-800 font-semibold mb-2"
            name="subject"
            onChange={handleAllChange}
          >
            <option value="">Subject</option>
            {college?.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          <br />
          <select
            className="rounded-md p-2 focus:outline-none text-purple-800 font-semibold"
            name="questionType"
            onChange={handleAllChange}
          >
            <option value="">questionType</option>
            <option value="mcq">MCQ</option>
            <option value="shortanswer">ShortAnswer</option>
          </select>
        </div>
      )}
      <br />

      <form onSubmit={handleSubmit}>
        {questions?.map((question, index) => (
          <MCQQuestion key={index} index={index} onQuestionChange={handleQuestionChange} />
        ))}
        <button
          type="submit"
          className="bg-purple-600 p-2 rounded-sm text-[14px] font-mono font-semibold text-white"
        >
          Create Test
        </button>
      </form>
    </div>
  );
};

export default TestCreationSheet;
