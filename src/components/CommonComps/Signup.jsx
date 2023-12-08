/* eslint-disable no-unused-vars */
import { useState } from "react";
import { RegisterImg } from "../../assets";
import SignupStudent from "../Student/Credentials/signup";
import SignUpTeacher from "../Teacher/Credentials/SignUp";

const Signup = () => {
  const [profession, setProfession] = useState("");

  return (
    <>
      <div className="relative bg-[rgb(242,241,236)] mt-[10vh] flex flex-col laptop:flex-row justify-center laptop:justify-around rounded-b-3xl pb-[10vh] min-h-[calc(100vh-10vh)]">
        {profession === "" && (
          <>
            <img className="absolute left-[15%] w-[35%]" src={RegisterImg} alt="registerImg" />
          <div className="absolute flex flex-col justify-center items-center w-[45%] h-[calc(100vh-20vh)] top-[8vh] right-5 border-2 rounded-md bg-[rgba(255,255,255,0.24)]">
            <div className="mb-[10vh] text-2xl">Profession</div>
            <div className=" flex flex-row gap-10 justify-between items-center">
              <div
                onClick={() => setProfession("student")}
                className=" bg-blue-300 transition-colors duration-200 p-3 rounded-md text-white font-semibold cursor-pointer hover:bg-blue-400"
              >
                Student
              </div>
              <div
                onClick={() => setProfession("teacher")}
                className="bg-blue-300 transition-colors duration-200 p-3 rounded-md text-white font-semibold cursor-pointer hover:bg-blue-400"
              >
                Professor/Teacher
              </div>
            </div>
          </div>
          </>
        )}
        {profession === "student" && <SignupStudent />}
        {profession === "teacher" && <SignUpTeacher/>}
      </div>
    </>
  );
};

export default Signup;
