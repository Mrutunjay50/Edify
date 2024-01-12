import React, { useState } from "react";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import GoogleSVG from "../../googleSVG";

const GoogleStPopUp = () => {
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    username: "",
    fullname: "",
    inWhat: "",
    schoolstudent: "",
    collegestudent: "",
    email: "",
    profilePicture : "",
  });

  const handleRegister = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  const [In, setIn] = useState("");
  const setCoOrSc = (e) => {
    let val = e.target.value;
    setIn(val);
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const accessToken = credentialResponse.access_token;

    try {
      const response = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const { name, picture, email } = response.data;

      setRegister({
        ...register,
        fullname: name,
        profilePicture: picture,
        email: email,
      });


      await axios.post(
        "https://edify-backend-service.onrender.com/auth/registerstudent",{
          // "http://localhost:8800/auth/registerstudent/?googleAuth=true", {
          ...register
        }
      );

      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const signupController = useGoogleLogin({
    onSuccess: handleGoogleLoginSuccess,
  });

  return (
    <div className="flex justify-center items-center ">
      <div className="flex flex-col gap-6 mt-[4%] w-[34%] rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] z-10 border-2 p-10 h-[80vh] bg-white">
        <div className="text-5xl font-mono text-black text-center mb-6">
          Signup
        </div>
        <div className="text-2xl text-black mr-32">Username</div>
        <input
          name="username"
          value={register.username}
          onChange={handleRegister}
          className="border-b-[1px] p-3 text-2xl border-black bg-transparent -mt-3 focus:outline-none"
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

        <div
          onClick={signupController}
          className="border-2 mt-16 rounded-md w-[100%] justify-center flex items-center py-1 cursor-pointer bg-white font-medium text-gray-800 text-[20px] text-center"
        >
          <>
            <span className=" w-[10%] h-auto text-blue-200 mr-5">
              <GoogleSVG />
            </span>
            Sign up with google
          </>
        </div>
      </div>
    </div>
  );
};

export default GoogleStPopUp;
