import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../CommonComps/LoginContext";
import SchoolCourse from "./SchoolCourse";
import CollegeCourse from "./CollegeCourse";

function Accordion(props) {
  return (
    <div
      className={
        props.isOpen[props.index] ? "cursor-default" : "cursor-pointer"
      }
    >
      <div
        className="accordion-header"
        onClick={() => {
          props.setIsOpen(!props.isOpen);
          props.setClickedTube(props.title);
          props.toggleAccordion(props.index);
        }}
      >
        {props.title}
      </div>
      {props.isOpen[props.index] && (
        <div className="accordion-content">{props.children}</div>
      )}
    </div>
  );
}

const ViewCourse = () => {
  const { userData, tokenId: token, setUserData } = useAuth();
  const { inWhat, course, subject } = useParams();
  const [school, setSchool] = useState([]);
  const [college, setCollege] = useState([]);
  const [testForms, setTestForms] = useState([]);
  const [time, setTime] = useState();
  const [clickedTube, setClickedTube] = useState(null);
  const [isOpen, setIsOpen] = useState([]);

  
  // Function to trigger the Google Apps Script and get the JSON data
  const getFormUrls = () => {
    fetch("http://localhost:8800/api/fetchurl", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data, which contains form URLs
        setTestForms(data);
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  };

  const getSchoolData = () => {
    axios
      .get("http://localhost:8800/api/getschool")
      .then((response) => {
        const classData = response.data
          .filter((item) => item.classname === course)[0]
          .subjects.filter(
            (item) => item.subjectname.replaceAll(" ", "") === subject
          );
        console.log(classData);

        setSchool(classData ? classData[0] : []);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getCollegeData = () => {
    axios
      .get("http://localhost:8800/api/getcollege")
      .then((response) => {
        const courseData = response.data
          .filter((item) => item.coursename === course)[0]
          .subjects.filter((item) => item.name.replaceAll(" ", "") === subject);
        setCollege(courseData ? courseData[0] : []);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getFormUrls();
    if (inWhat === "school") {
      getSchoolData();
    } else if (inWhat === "college") {
      getCollegeData();
    }
  }, [inWhat]);

  const addToRecentItems = async (title) => {

    const studentId = userData && userData._id;

    try {
      if (title && time) {
        const response = await axios.put(
          "http://localhost:8800/updaterecentseen",
          {
            studentId,
            clicked: `${inWhat} ${course} ${subject} ${title
              .split(" ")
              .join("")} ${time}`,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data.student);
      }
    } catch (error) {
      console.error("Error updating recent items:", error);
    }
  };

  // Function to toggle the open state of an accordion
  const toggleAccordion = (index) => {
    const newIsOpen = new Array(isOpen.length).fill(false);
    newIsOpen[index] = !isOpen[index];
    setIsOpen(newIsOpen);
  };

  const handleVideoComplete = (videoId, title, subject) => {
    console.log("videoCompleted", videoId, title, subject);
  
    // Send a request to your backend API to store completion data
    axios
      .put("http://localhost:8800/storeCompletion", {
        videoId: videoId,
        userId: userData._id, // Assuming you have user data available
        title : `${subject} ${title.split(" ").join("")}`
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setUserData(response.data.student);
          // Handle success, e.g., show a completion message
          console.log("Video completed!");
        } else {
          // Handle other errors
          console.error("Error storing completion data");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400 && error.response.data.message === 'Video already marked as completed') {
          // Handle the case when the video is already marked as completed
          console.log("Video is already marked as completed");
        } else {
          // Handle network errors and other errors
          console.error("Network error:", error);
        }
      });
  };
  

  useEffect(()=>{
    // Get the current date and time
    const currentTime = new Date().getTime();

    // Set the clickedTube and time
    
    setTime(currentTime);
    addToRecentItems(clickedTube)
    // setIsOpen(
    //   isOpen.map((_, index) => openedAccordion === index ? true : false) // Open the clicked accordion
    // );
  },[clickedTube])

  return (
    <div>
      {inWhat === "school" ? (
        <SchoolCourse
          school={school}
          testForms={testForms}
          Accordion={Accordion}
          addToRecentItems={addToRecentItems}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          toggleAccordion={toggleAccordion}
          subject={subject}
          setClickedTube={setClickedTube}
          handleVideoComplete={handleVideoComplete}
          testForm={testForms}
        />
      ) : (
        ""
      )}
      {inWhat === "college" ? (
        <CollegeCourse
          college={college}
          testForms={testForms}
          Accordion={Accordion}
          addToRecentItems={addToRecentItems}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          toggleAccordion={toggleAccordion}
          subject={subject}
          setClickedTube={setClickedTube}
          handleVideoComplete={handleVideoComplete}
          testForm={testForms}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default ViewCourse;
