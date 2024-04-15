import React, { useState, useEffect } from "react";
import apiurl from "../utils.jsx"
import MCQQuestion from "./MCQQuestion"


const TestCreationSheet = () => {
    const [school, setSchool] = useState([]);
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

  useEffect(() =>{
    setQuestions(Array(parseInt(noOfQuestions)).fill({ prompt: "", options: ["", "", "", ""], correctOption: "" }));
    console.log(noOfQuestions, "changes")
  },[noOfQuestions])

  const handleAllChange = (e) => {
    const { name, value } = e.target;
    // If the field being changed is 'options', update the specific option by index
      // For other fields, update them directly
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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted questions:", questions);
    // Handle form submission here, such as sending the questions to the server
  };

  console.log(questions)
  
  return (
    <div className=" py-[3vh] px-8 bg-[#d0d7ff65] font-mono min-h-[100vh] overflow-y-scroll w-[700px] relative left-[25%] rounded-md mt-[14vh] mb-4 border-2">
      <div className="text-[#313131] font-semibold text-center mb-4">
        Create Test Form
      </div>
      <select
        className=" rounded-md p-2 focus:outline-none text-[#2d2c2c] font-semibold mb-2 mr-4"
        name="courseType"
        id=""
        onChange={handleAllChange}
      >
        <option value="">choose</option>
        <option value="school">school</option>
        <option value="college">college</option>
      </select>

      <select  className=" rounded-md p-2 focus:outline-none text-[#2d2c2c] font-semibold mb-2" name="questions" id="" onChange={(e) => setNoOfQuestions(e.target.value)}>
        <option value="0">no. of questions</option>
        <option value="10">10</option>
        <option value="25">25</option>
      </select>

      <br />
      {testData.courseType === "school" && (
        <div>
          <label htmlFor="class">Choose Class : </label>
          <select
            className=" rounded-md p-2 focus:outline-none text-[#2d2c2c] font-semibold mb-2"
            name="classes"
            id="class"
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
          <label htmlFor="subject">Choose Subject : </label>
          <select
            className=" rounded-md p-2 focus:outline-none text-[#2d2c2c] font-semibold mb-2"
            name="subject"
            id="subject"
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
            className=" rounded-md p-2 focus:outline-none text-[#2d2c2c] font-semibold"
            name="questionType"
            id=""
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
          <label htmlFor="course">Choose Course : </label>
          <select
            className=" rounded-md p-2 focus:outline-none text-[#2d2c2c] font-semibold"
            name="course"
            id="course"
            onChange={handleAllChange}
          >
            <option value="">Course</option>
            <option value="Btech">Btech</option>
            <option value="Bsc">Bsc</option>
          </select>
          <br />
          <label htmlFor="subject">Choose Subject : </label>
          <select
            className=" rounded-md p-2 focus:outline-none text-[#2d2c2c] font-semibold mb-2"
            name="subject"
            id="subject"
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
            className=" rounded-md p-2 focus:outline-none text-[#2d2c2c] font-semibold"
            name="questionType"
            id=""
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
          className="bg-blue-400 p-2 rounded-sm text-[14px] font-mono font-semibold text-white"
        >
          Create Test
        </button>
      </form>
    </div>
  )
}

export default TestCreationSheet