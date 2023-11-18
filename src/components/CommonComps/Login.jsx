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
    const { email, password } = login;
    try {
      const response = await axios.post("http://localhost:8800/auth/login", {
        email,
        password,
      });
      const { token, user } = response.data; // Extract token and user data
      setUserData(user);
      setToken(token);

      // Store the token in local storage
      //   localStorage.setItem("jwt", token);

      localStorage.setItem("isAuthenticated", true);
      document.cookie = `jwt=` + token;

      navigate("/Edify");
    } catch (error) {
      console.log("Unable to login:", error);
    }
    
  };


  return (
    <div className="relative bg-[rgb(242,241,236)] h-[calc(100vh-10vh)] flex flex-row justify-around rounded-b-3xl font-roboto mb-1 mt-[10vh]">
      {/* Left */}
      <div className="">
        <img src={login2} alt="" className="w-full h-[100vh]"></img>
      </div>

      {/* right */}
      <div className="flex flex-col justify-center w-[55vw] px-32 mr-[8vw] ">
        <div className="text-5xl text-black text-center mb-10 font-roboto">
          Login
        </div>
        <div className="text-2xl text-black mr-32">This is my Email</div>
        <br />
        <input
          type="email"
          name="email"
          onChange={handleLogin}
          value={login.email}
          onKeyDown={handleKeyDown} // Listen for Enter key
          className=" py-2 rounded-sm border-b-[1px] border-black bg-[rgb(242,241,236)] -mt-3 focus:outline-none"
        ></input>
        <br />
        <div className="text-2xl text-black mr-32">This is my Password</div>
        <br />
        <input
          type="password"
          name="password"
          onChange={handleLogin}
          value={login.password}
          onKeyDown={handleKeyDown} // Listen for Enter key
          className="py-2 rounded-sm border-b-[1px] border-black bg-[rgb(242,241,236)] -mt-3 focus:outline-none"
        ></input>
        <br />
        <button
          onClick={handleSubmit}
          className="bg-[#211b3e] rounded-lg h-12 text-white my-6"
        >
          Login
        </button>
        <Link to="/Edify/signup">
          <h1 className="text-black/60 text-center text-lg font-sans cursor-pointer hover:underline hover:text-blue-600">
            Not a member!?
            <span className="cursor-pointer  text-lg font-sans">Signup</span>
          </h1>
        </Link>
      </div>
    </div>
  );
};

export default Login;
