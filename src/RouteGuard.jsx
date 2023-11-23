import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./components/CommonComps/LoginContext";

const RouteGuard = () => {
  const { userData } = useAuth();
  const location = useLocation();

  if (userData && userData.inWhat === "college") {
    if (location.pathname.includes("/school/")) {
      return <Navigate to="/" />;
    } else if (
      location.pathname.startsWith("/college/") &&
      !location.pathname.includes(`/college/${userData.collegestudent}`)
    ) {
      return <Navigate to="/" />;
    }
  } else if (userData && userData.inWhat === "school") {
    if (location.pathname.includes("/college/")) {
      return <Navigate to="/" />;
    } else if (
      location.pathname.startsWith("/school/") &&
      !location.pathname.includes(`/school/${userData.schoolstudent}/`)
    ) {
      return <Navigate to="/" />;
    }
  }

  return <Outlet />;
};

export default RouteGuard;
