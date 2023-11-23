import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../CommonComps/LoginContext";

const ProNavbar = ({className}) => {
    const navigate = useNavigate();
    const { setUserData } = useAuth();
    const handleLogout = () => {
        document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setUserData(null);
        localStorage.removeItem("isAuthenticated");
        navigate('/');
      };
  return (
    <div className={className}>
        <div className="h-[41vh] w-[210px] bg-inherit border-r-[0.1px] ml-6 border-black/60  font-playpen">
            <div className="flex flex-col items-start ml-1">
                <div className="hover:border-y-[0.1px] hover:border-black/70 w-[90%] p-4 cursor-pointer">
                    <Link to='/profile'>Profile</Link>
                </div>
                <div className="hover:border-y-[0.1px] hover:border-black/70 w-[90%] p-4 cursor-pointer">
                    <Link to='/leaderboard'>LeaderBoard</Link>
                </div>
                <div className="hover:border-y-[0.1px] hover:border-black/70 w-[90%] p-4 cursor-pointer">
                    <Link to='/editprofile'>Edit Profile</Link>
                </div>
                <div className="hover:border-y-[0.1px] hover:border-black/70 w-[90%] p-4 cursor-pointer">
                    <Link to='/settings'>Account Settings</Link>
                </div>
                <div onClick={handleLogout} className="hover:border-y-[0.1px] hover:border-black/70 w-[90%] p-4 cursor-pointer">
                <Link to='/'>Logout</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProNavbar;