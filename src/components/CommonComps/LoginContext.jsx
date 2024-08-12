import React, { useState, useEffect, createContext, useContext } from "react";
import jwt_decode from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import apiurl from "../utils";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  const [tokenId, setToken] = useState();

  useEffect(() => {
    // Retrieve the token from the HTTP cookie
    const cookies = document.cookie.split(';');
    let token = null;
  
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith("jwt=")) {
        token = cookie.substring("jwt=".length, cookie.length);
        break;
      }
    }
    token = localStorage.getItem("edify_token")
  
    if (token) {
      // Decode the token to get user data
      const decodedUserData = jwt_decode(token);
      console.log(decodedUserData);
      const { userId, profession } = decodedUserData;

      setToken(token);
      localStorage.setItem("edify_token", token);

      let loginEndpoint;
      if (profession === "student") {
        loginEndpoint = "/auth/getUser/student";
      } else if (profession === "teacher/professor") {
        loginEndpoint = "/auth/getUser/teacher";
      }

      if (loginEndpoint) {
        apiurl
          .get(loginEndpoint, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json; charset=UTF-8'
            },
            params: {
              userId: userId,
              profession: profession,
            }
          })
          .then((response) => {
            const { user } = response.data;
            setUserData(user);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        console.log("Invalid profession:", profession);
      }
  
      // Check token expiration (optional)
      const expirationTimestamp = decodedUserData.exp * 1000; // Convert to milliseconds
      const currentTimestamp = Date.now();
  
      if (currentTimestamp > expirationTimestamp) {
        // Token has expired, you may want to redirect to the login page
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("edify_token");
        setUserData(null);
        navigate("/login");
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userData, setUserData, tokenId, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
