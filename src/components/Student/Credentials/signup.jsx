/* eslint-disable no-unused-vars */
import { useState } from "react";
import { StudentRegister } from "../../../assets";
import { Link, useNavigate } from "react-router-dom";
import GoogleSVG from "../../googleSVG";
import apiurl from "../../utils";

const SignupStudent = () => {
  const navigate = useNavigate();

  const [register, setRegister] = useState({
    username: "",
    fullname: "",
    inWhat: "",
    schoolstudent: "",
    collegestudent: "",
    email: "",
    password: "",
    cPass: "",
    profilePicture: "",
  });

  const handleRegister = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  const [In, setIn] = useState("");
  const setCoOrSc = (e) => {
    let val = e.target.value;
    setIn(val);
  };

  const handleSubmit = async (event) => {

    try {
      await apiurl.post(
        "/api/auth/register-user",
        {
          ...register, googleAuth:false
        }
      );

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
          src={StudentRegister}
          alt=""
          className=" sticky top-[30%] w-[400px] laptop:w-full rounded-3xl mt-[20%]"
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
        <div className="text-2xl text-black mr-32">I Study in</div>
        <select
          name="inWhat"
          defaultValue=""
          onClick={setCoOrSc}
          onChange={handleRegister}
          className="w-full bg-transparent text-2xl border-b-[1px] border-black -mt-3 text-[18px] font-semibold focus:outline-none"
        >
          <option value="">choose</option>
          <option value="school">school</option>
          <option value="college">college</option>
        </select>
        <div className="text-2xl text-black mr-32">Courses</div>
        {In === "school" ? (
          <select
            name="schoolstudent"
            defaultValue=""
            onChange={handleRegister}
            className="w-full bg-transparent text-2xl border-b-[1px] border-black -mt-3 text-[18px] font-semibold focus:outline-none"
          >
            <option value="">choose</option>
            <option value="6">6th</option>
            <option value="7">7th</option>
            <option value="8">8th</option>
            <option value="9">9th</option>
            <option value="10">10th</option>
            <option value="11">11th</option>
            <option value="12">12th</option>
          </select>
        ) : (
          <select
            name="collegestudent"
            defaultValue=""
            onChange={handleRegister}
            className="w-full bg-transparent border-b-[1px] border-black -mt-3 text-[18px] font-semibold focus:outline-none"
          >
            <option value="">choose</option>
            <option value="Btech">B.Tech</option>
            <option value="Bsc">B.Sc</option>
          </select>
        )}
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
        <Link
          to="/googlesignup"
          className="border-2 rounded-md w-[100%] justify-center flex items-center py-1 cursor-pointer bg-white font-medium text-gray-800 text-[20px] text-center"
        >
          <>
            <span className=" w-[10%] h-auto text-blue-200 mr-5">
              <GoogleSVG />
            </span>
            Sign up with google
          </>
        </Link>

        <h1 className="text-black/60 text-center text-lg font-sans group cursor-pointer">
          Already a member!?
          <span className="cursor-pointer text-black/60 text-lg font-sans group-hover:text-blue-500 group-hover:underline">
            <Link to="/login"> Login</Link>
          </span>
        </h1>
      </div>
    </>
  );
};

export default SignupStudent;
