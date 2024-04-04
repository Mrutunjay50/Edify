import React, { useState, useEffect } from "react";
import axios from "axios";


const QuestionSection = ({testData, handleAllChange, noOfQuestions}) =>{

  const componentsArray = Array.from({ length: noOfQuestions }, (value, index) => (
    <div key={index} className="relative mb-10">
      <div className="flex flex-row justify-center items-center">
      <span className="absolute left-2 font-semibold">Q{index+1}{" "}</span>
      <textarea
        className="h-[6vh] w-full rounded-md p-2 pl-[40px] focus:outline-none text-[#2d2c2c] font-semibold"
        name="question"
        cols="30"
        placeholder="write the question"
        value={testData.question}
        onChange={handleAllChange}
      ></textarea></div>
      {/* multiple choice creation logic */}
      {testData.questionType === "mcq" ? (
        testData.options.map((option, index) => (
          <div key={index} className=" bg-[#ffffff] p-2 m-2 rounded-md">
            <label>
              Option {index + 1}:
              <br />
              <input
                className=" focus:outline-none p-1 rounded-sm mx-2 font-mono bg-[#f2eec785] w-[80%]"
                name={`options ${index}`}
                type="text"
                placeholder="write the option"
                value={testData.options[index]}
                onChange={handleAllChange}
                required
              />
            </label>
            <input
              type="radio"
              name="correctOption"
              value={index}
              checked={testData.correctOption === index}
              onChange={handleAllChange}
            />{" "}
            {testData.correctOption === index ? "Correct" : ""}
          </div>
        ))
      ) : (
        <textarea
          className="h-[6vh] w-full rounded-md p-2 focus:outline-none text-[#2d2c2c] font-semibold"
          name="shortAnswer"
          id=""
          cols="30"
          placeholder="write the answer"
          rows="2"
          value={testData.shortAnswer}
          onChange={handleAllChange}
        ></textarea>
      )}
    </div>
  ));

  return (
    <>
      {componentsArray}
    </>
  )
}




const TestCraetionForm = () => {
  const [school, setSchool] = useState([]);
  const [college, setCollege] = useState([]);
  const [noOfQuestions, setNoOfQuestions] = useState(0);
  const [testData, setTestData] = useState({
    courseType: "",
    questionType: "",
    subject: "",
    classes: "",
    course: "",
    question: "",
    options: ["", "", "", ""],
    correctOption: 0,
    shortAnswer: "",
    difficulty: "easy",
  });

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
  }, [testData.classes, testData.course]);

  const handleAllChange = (e) => {
    const { name, value } = e.target;

    // If the field being changed is 'options', update the specific option by index
    if (name.startsWith("options")) {
      const index = parseInt(name.split(" ")[1], 10);
      const newOptions = [...testData.options];
      newOptions[index] = value;
      setTestData((prevState) => ({
        ...prevState,
        options: newOptions,
      }));
    } else if (name === "correctOption") {
      const correctOptionIndex = parseInt(value, 10);
      setTestData((prevState) => ({
        ...prevState,
        correctOption: correctOptionIndex,
      }));
    } else {
      // For other fields, update them directly
      setTestData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const { courseType, questionType, subject, classes, course, question, options, correctOption, shortAnswer, difficulty} = testData;

    axios
      .post("http://localhost:8800/createquestion", { courseType, questionType, subject, classes, course, question, options, correctOption, shortAnswer, difficulty,})
      .then((response) => {
        // Handle a successful response from the server, if needed
        console.log("Data sent successfully", response.data);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Error sending data", error);
      });
    setTestData({
      courseType: "",
      questionType: "",
      subject: "",
      classes: "",
      course: "",
      question: "",
      options: ["", "", "", ""],
      correctOption: 0,
      shortAnswer: "",
      difficulty: "easy",
    });
  };

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
        <option value="">no. of questions</option>
        <option value="1">1</option>
        <option value="2">2</option>
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

      <QuestionSection testData={testData} handleAllChange={handleAllChange} noOfQuestions={noOfQuestions}/>
      <button
        type="submit"
        onClick={handleSubmit}
        className=" bg-blue-400 p-2 rounded-sm text-[14px] font-mono font-semibold text-white"
      >
        Create Question
      </button>
    </div>
  );
};

export default TestCraetionForm;
