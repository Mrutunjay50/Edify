import React from 'react'
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { TeacherRegister } from "../../../assets";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import apiurl from '../../utils';



const SignUpTeacher = () => {
    const navigate = useNavigate();
    const [register, setRegister] = useState({
      username: "",
      fullname: "",
      classes : "",
      email: "",
      password: "",
      cPass: "",
    });
  
    const handleRegister = (e) => {
      setRegister({ ...register, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (event) => {
      const {
        username,
        fullname,
        classes,
        email,
        password,
        cPass,
      } = register;
      try {
        await apiurl.post("/api/auth/register-user", {
          username,
          fullname,
          classes,
          email,
          password,
          cPass,
        });
        navigate("/login");
      } catch (error) {
        console.log("not able to register");
      }
    };
  
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        handleSubmit();
      }
    };
  
    return (
      <>
        <div className=" mt-[2%] laptop:mr-[5rem] absolute pc:relative p-8 z-0 pc:block h-[120vh] top-10">
          <img
            src={TeacherRegister}
            alt=""
            className=" sticky top-[50%] w-[400px] laptop:w-full rounded-3xl mt-[35%]"
          ></img>
        </div>
  
        {/* right */}
        <div className="flex flex-col gap-6 -mt-20 pc:mt-[4%] mx-10 pc:mr-[15%] w-[full] pc:w-[60vh] z-10">
          <div className="text-5xl font-mono text-black text-center mb-6">
            Signup
          </div>
          <div className="text-2xl text-black mr-32">Username</div>
          <input
            name="username"
            value={register.username}
            onChange={handleRegister}
            className="border-b-[1px] text-2xl border-black bg-[rgb(242,241,236)] -mt-3 focus:outline-none"
          ></input>
          <div className="text-2xl text-black mr-32">My Name is</div>
          <input
            name="fullname"
            value={register.fullname}
            onChange={handleRegister}
            className="border-b-[1px] text-2xl border-black bg-[rgb(242,241,236)] -mt-3 focus:outline-none"
          ></input>
          
          <div className="text-2xl text-black mr-32">Can Teach</div>
          <input
            type="text"
            name="classes"
            autoComplete="off"
            value={register.classes}
            placeholder='if multiple write "7,4,2.."'
            onChange={handleRegister}
            className="border-b-[1px] text-2xl border-black bg-[rgb(242,241,236)] -mt-3 focus:outline-none"
          ></input>
          <div className="text-2xl text-black mr-32">This is my Email</div>
          <input
            type="email"
            name="email"
            autoComplete="off"
            value={register.email}
            onChange={handleRegister}
            className="border-b-[1px] text-2xl border-black bg-[rgb(242,241,236)] -mt-3 focus:outline-none"
          ></input>
          <div className="text-2xl text-black mr-32">Set My Password to</div>
          <input
            type="password"
            name="password"
            autoComplete="off"
            value={register.password}
            onChange={handleRegister}
            className="border-b-[1px] border-black text-2xl bg-[rgb(242,241,236)] -mt-3 focus:outline-none"
          ></input>
          <div className="text-2xl text-black mr-32">My Password is</div>
          <input
            type="password"
            name="cPass"
            autoComplete="off"
            value={register.cPass}
            onChange={handleRegister}
            onKeyDown={handleKeyDown} 
            className="border-b-[1px] border-black text-2xl bg-[rgb(242,241,236)] -mt-3 focus:outline-none"
          ></input>
          <button
            onClick={handleSubmit}
            className="bg-[#211b3e] rounded-lg h-12 text-white"
          >
            Register
          </button>
          <h1 className="text-black/60 text-center text-lg font-sans group cursor-pointer">
            Already a member!?
            <span className="cursor-pointer text-black/60 text-lg font-sans group-hover:text-blue-500 group-hover:underline">
              <Link to="/login" > Login</Link>
            </span>
          </h1>
        </div>
      </>
  )
}

export default SignUpTeacher;