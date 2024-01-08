/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./LoginContext";
import { login2 } from "../../assets";

const Login = () => {
  const navigate = useNavigate();
  const { setUserData, setToken } = useAuth();
  const [login, setLogin] = useState({
    email: "",
    password: "",
    profession : ""
  });

  const handleLogin = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = async (event) => {
    const { email, password, profession } = login;
    try {
      var response;
      if(profession === 'student'){
       response = await axios.post("https://edify-backend-service.onrender.com/auth/loginstudent", {
        //  response = await axios.post("http://localhost:8800/auth/loginstudent", {
        email,
        password,
        profession
      });
      }else{
         response = await axios.post("http://localhost:8800/auth/loginteacher", {
        email,
        password,
        profession
      });
      }
      const { token, user } = response.data; // Extract token and user data
      console.log(user);
      setUserData(user);
      setToken(token);

      // Store the token in local storage
      //   localStorage.setItem("jwt", token);

      localStorage.setItem("isAuthenticated", true);
      document.cookie = `jwt=` + token;

      navigate("/");
    } catch (error) {
      console.log("Unable to login:", error);
    }
    
  };

  return (
    <>
      <div className="relative bg-[rgb(242,241,236)] w-full h-[100vh] laptop:h-[calc(100vh-10vh)] flex flex-col laptop:flex-row justify-between tablet:justify-around items-center rounded-b-3xl font-roboto mb-1 mt-[10vh]">
      {/* Left */}
      <div className="">
        <img src={login2} alt="" className=" w-[350px] laptop:w-full pc:h-[100vh] absolute laptop:relative z-0 right-0"></img>
      </div>

      {/* right */}
      <div className="flex flex-col justify-center w-full absolute mt-[14vh] tablet:mt-0 tablet:relative px-2 pc:w-[55vw] tablet:px-32 tablet:mr-[8vw] bg-transparent z-10">
        <div className="text-4xl tablet:text-5xl text-black text-center mb-10 font-roboto">
          Login
        </div>
        <div className=" tablet:w-full text-2xl text-black mx-[5%] tablet:mx-0 w-full mr-32">Profession</div>
        <br />
        <select name="profession" id="" onChange={handleLogin} className="bg-transparent focus:outline-none border-b-[1px] border-black rounded-sm py-2">
          <option value=""></option>
          <option value="student">Student</option>
          <option value="teacher/professor">Teacher/Professor</option>
        </select>
        <br />
        <div className=" tablet:w-full text-2xl text-black mx-[5%] tablet:mx-0 w-full mr-32">This is my Email</div>
        <br />
        <input
          type="email"
          name="email"
          onChange={handleLogin}
          value={login.email}
          onKeyDown={handleKeyDown} // Listen for Enter key
          className=" mx-[5%] tablet:mx-0 w-[90%] tablet:w-full py-2 rounded-sm border-b-[1px] border-black bg-[rgb(242,241,236)] -mt-3 focus:outline-none"
        ></input>
        <br />
        <div className="text-2xl text-black mx-[5%] tablet:mx-0 w-full mr-32">This is my Password</div>
        <br />
        <input
          type="password"
          name="password"
          onChange={handleLogin}
          value={login.password}
          onKeyDown={handleKeyDown} // Listen for Enter key
          className="mx-[5%] tablet:mx-0 w-[90%] tablet:w-full py-2 rounded-sm border-b-[1px] border-black bg-[rgb(242,241,236)] -mt-3 focus:outline-none"
        ></input>
        <br />
        <button
          onClick={handleSubmit}
          className="bg-[#211b3e] mx-[5%] tablet:mx-[0%] rounded-lg h-12 text-white my-6"
        >
          Login
        </button>
        <Link to="/signup">
          <h1 className="text-black/60 text-center text-lg font-sans cursor-pointer hover:underline hover:text-blue-600">
            Not a member!?
            <span className="cursor-pointer  text-lg font-sans">Signup</span>
          </h1>
        </Link>
      </div>
    </div>
    </>
  )
};

export default Login;
