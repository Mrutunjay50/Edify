/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./LoginContext";
import { login2 } from "../../assets";
import LoginStudent from "../Student/Credentials/login";

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
      // const response = await axios.post("https://edify-backend-service.onrender.com/auth/login", {
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

      navigate("/");
    } catch (error) {
      console.log("Unable to login:", error);
    }
    
  };

  return (
    <>
      <LoginStudent login={login} handleLogin={handleLogin} handleKeyDown={handleKeyDown} handleSubmit={handleSubmit} login2={login2} Link={Link}/>
    </>
  )
};

export default Login;
