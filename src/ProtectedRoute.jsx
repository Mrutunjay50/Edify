import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "./components/LoginContext"; // Assuming you have an AuthContext

const ProtectedRoute = () => {
    // const { userData } = useAuth();
    const isAuthenticated = localStorage.getItem("isAuthenticated");
   if (isAuthenticated) {
        return <Outlet />;
    } else  {
        return <Navigate to="/Edify" replace />;
    }
};

export default ProtectedRoute;