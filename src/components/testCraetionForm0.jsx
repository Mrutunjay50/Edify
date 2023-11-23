import React, { useState, useEffect } from "react";
import axios from "axios";


const QuestionSection = ({testData, handleAllChange, questionDetail}) =>{

  
    return (
      <>
        {testData?.map((value1, index) => (
      <div key={index} className="relative mb-10">
        <div className="flex flex-row justify-center items-center">
        <span className="absolute left-2 font-semibold">Q{index+1}{" "}</span>
        <textarea
          className="h-[6vh] w-full rounded-md p-2 pl-[40px] focus:outline-none text-[#2d2c2c] font-semibold"
          name="question"
          cols="30"
          placeholder="write the question"
          value={value1.question}
          onChange={(e) => handleAllChange(e, index)}
        ></textarea></div>
        {/* multiple choice creation logic */}
        {questionDetail.questionType === "mcq" ? (
          value1.options.map((option, optionIndex) => (
            <div key={optionIndex} className=" bg-[#ffffff] p-2 m-2 rounded-md">
              <label>
                Option {optionIndex + 1}:
                <br />
                <input
                  className=" focus:outline-none p-1 rounded-sm mx-2 font-mono bg-[#f2eec785] w-[80%]"
                  name={`options ${index} ${optionIndex}`}
                  type="text"
                  placeholder="write the option"
                  value={value1.options[optionIndex]}
                  onChange={(e) => handleAllChange(e, index, optionIndex)}
                  required
                />
              </label>
              <input
                type="radio"
                name={`correctOption`}
                value={optionIndex}
                // checked={value1.correctOption === optionIndex}
                onClick={(e) => handleAllChange(e, index, optionIndex)}
              />{" "}
              {value1.correctOption === optionIndex ? "Correct" : ""}
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
            value={value1.shortAnswer}
            onChange={(e) => handleAllChange(e, index)}
          ></textarea>
        )}
      </div>
    ))}
      </>
    )
  }



const TestCreationForm = () => {
    const [school, setSchool] = useState([]);
    const [college, setCollege] = useState([]);
    const [noOfQuestions, setNoOfQuestions] = useState(2);

    const [questionDetail, setQuestionDetail] = useState({
        courseType: "",
      questionType: "",
      subject: "",
      classes: "",
      course: ""
    })

    const [testData, setTestData] = useState([]);
  
    useEffect(() => {
        // Initialize testData with the desired number of default questions
        const defaultQuestion = {
          question: "",
          options: ["", "", "", ""],
          correctOption: 0,
          shortAnswer: "",
          difficulty: "easy",
        };
        setTestData(Array.from({ length: noOfQuestions }, () => ({ ...defaultQuestion })));
      }, [noOfQuestions])

    const getSchoolData = () => {
        axios
          .get("http://localhost:8800/api/getschool")
          .then((response) => {
            const clams = response.data
              .filter((items) => items.classname === questionDetail.classes)[0]
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
              .filter((items) => items.coursename === questionDetail.course)[0]
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
      }, [questionDetail.classes, questionDetail.course]);
    
      const handleQuestionDetail = (e) => {
        const { name, value } = e.target;

            if (name === 'classes') {
                // If classes are changed, reset the course to an empty string
                setQuestionDetail({
                  ...questionDetail,
                  [name]: value,
                  course: '',
                });
              } else if (name === 'course') {
                // If course is changed, reset the classes to an empty string
                setQuestionDetail({
                  ...questionDetail,
                  [name]: value,
                  classes: '',
                });
              } else {
                setQuestionDetail({
                  ...questionDetail,
                  [name]: value,
                });
              }

      };


      const handleAllChange = (e, questionIndex, optionIndex) => {
        const { name, value } = e.target;
        const updatedTestData = [...testData];
      
        // If the field being changed is 'options', update the specific option by index
        // Check if testData[index] is defined before accessing its properties
        if (testData[questionIndex]) {
            if (name.startsWith("options")) {
                if (updatedTestData[questionIndex]) {
                    updatedTestData[questionIndex].options[optionIndex] = value;
                    setTestData(updatedTestData);
                  }
            } else if (name === "correctOption") {
                const correctOptionIndex = parseInt(value, 10);
                updatedTestData[questionIndex].correctOption = optionIndex;
            } else {
                updatedTestData[questionIndex][name] = value;
            }
            setTestData(updatedTestData);
        }
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
          onChange={handleQuestionDetail}
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
        {questionDetail.courseType === "school" && (
          <div>
            <label htmlFor="class">Choose Class : </label>
            <select
              className=" rounded-md p-2 focus:outline-none text-[#2d2c2c] font-semibold mb-2"
              name="classes"
              id="class"
              onChange={handleQuestionDetail}
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
              onChange={handleQuestionDetail}
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
              onChange={handleQuestionDetail}
            >
              <option value="">questionType</option>
              <option value="mcq">MCQ</option>
              <option value="shortanswer">ShortAnswer</option>
            </select>
          </div>
        )}
        {questionDetail.courseType === "college" && (
          <div className="">
            <label htmlFor="course">Choose Course : </label>
            <select
              className=" rounded-md p-2 focus:outline-none text-[#2d2c2c] font-semibold"
              name="course"
              id="course"
              onChange={handleQuestionDetail}
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
              onChange={handleQuestionDetail}
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
              onChange={handleQuestionDetail}
            >
              <option value="">questionType</option>
              <option value="mcq">MCQ</option>
              <option value="shortanswer">ShortAnswer</option>
            </select>
          </div>
        )}
        <br />

        <QuestionSection testData={testData} handleAllChange={handleAllChange} questionDetail={questionDetail}/>
        <button
          type="submit"
        //   onClick={handleSubmit}
          className=" bg-blue-400 p-2 rounded-sm text-[14px] font-mono font-semibold text-white"
        >
          Create Question
        </button>
      </div>
    );
  };
  
  export default TestCreationForm;