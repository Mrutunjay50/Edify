import { Link } from "react-router-dom";
import { useAuth } from "./LoginContext";
import { useEffect, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const Navbar = () => {
  const { userData, setUserData } = useAuth();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const [showMenu, setShowMenu] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos < 300) {
        setShowNavbar(true);
      } else if (prevScrollPos > currentScrollPos) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const handleLogout = () => {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("isAuthenticated");
    setUserData(null);
  };

  return (
    <div
      className={`group ${showMenu ? " bg-black" : " bg-transparent "} ${
        showNavbar
          ? " transition ease-in-out translate-y-0 transform duration-300"
          : "-translate-y-full transition transform ease-in-out duration-300"
      } fixed z-50 h-[8vh] tablet:h-[14vh] w-full top-0 flex flex-col font-semibold justify-around hover:scale-100`}
    >
        <div className={`${showMenu ? "h-[7.8vh] " : "h-[10vh]"} duration-300 z-50 bg-white border-b-2 border-[#838383] group-hover:border-white group-hover:text-white transition-all ease-in-out group-hover:bg-[#211b3e] relative flex flex-row justify-between items-center`}>
        <div className="text-2xl ml-10 transition-all hover:scale-100 font-playpen font-medium">
          <Link to="/" className="bg-gradient-to-r from-[#6a94fd] to-[#7018fd] bg-clip-text text-transparent">Edify</Link>
        </div>
        {userData ? (
          <div className=" font-mono flex laptop:justify-end items-center gap-[2.4rem] laptop:ml-[56%] mr-10 font-playpen">
            <h2
              className="text-md font-light cursor-pointer transition-all hover:scale-90"
              onClick={handleLogout}
            >
              <Link to="/">Logout</Link>
            </h2>
            <Link to="/profile">
              <div className="h-[2.5rem] w-[2.6rem] rounded-full cursor-pointer bg-white">
                {userData.profilePicture ? (
                  <img
                    src={`https://edify-backend-service.onrender.com/${userData.profilePicture}`}
                    alt="Profile Picture"
                    className="w-full h-full object-cover object-top rounded-full"
                  />
                ) : (
                  <img
                    className="object-cover rounded-full"
                    src="https://cdn.pixabay.com/photo/2016/04/22/04/57/graduation-1345143__340.png"
                    alt="profile photo"
                  />
                )}
                
              </div>
            </Link>
            <FiChevronDown onClick={() => setShowMenu(!showMenu)} className={` ${showMenu ? "rotate-180" : " tablet:rotate-180"} h-[20px] w-[20px] absolute tablet:bottom-0 transition-all hover:scale-125 right-1 tablet:left-[50%] cursor-pointer`}/>
            
          </div>
        ) : (
          <div className=" font-mono flex tablet:justify-end gap-[2.4rem] laptop:ml-[56%] mt-[0.47rem] mr-10 font-playpen">
            <h2 className="text-md font-light cursor-pointer transition-all hover:scale-90 ml-32">
              <Link to="/login">Login</Link>
            </h2>
            <h2 className="text-md font-light cursor-pointer transition-all hover:scale-90">
              <Link to="/signup">Signup</Link>
            </h2>
            <FiChevronDown onClick={() => setShowMenu(!showMenu)} className={` ${showMenu ? "" : "rotate-180"} h-[20px] w-[20px] absolute tablet:bottom-0 transition-all hover:scale-125 right-1 tablet:left-[50%] cursor-pointer`}/>
          </div>
        )}
        </div>
        <div className={`${showMenu ? "h-[80vh] tablet:h-[6.2vh]  w-full group-hover:bg-[#211b3e] z-10 group-hover:text-white bg-white translate-y-0" : "h-[80vh]  tablet:h-[4vh] -translate-y-6"}  transition-all duration-300 ease-in-out flex flex-col tablet:flex-row absolute top-0 tablet:relative items-center justify-center gap-[2.5rem]`}>
        {showMenu && 
        <>
        <div className="text-md cursor-pointer transition-all hover:scale-105 tablet:-ml-10">
          <Link to="/about">About us</Link>
        </div>
        <div className="text-md cursor-pointer transition-all hover:scale-105">
          <Link to="/courses">Courses</Link>
        </div>
        {userData ? (
          <div className="text-md cursor-pointer transition-all hover:scale-105">
            <Link to="/typechecker">Typing Master</Link>
          </div>
        ) : (
          ""
        )}
        <div className="text-md cursor-pointer transition-all hover:scale-105">
          <Link to="/studymaterial">Study Material</Link>
        </div>
        <div className="text-md cursor-pointer transition-all hover:scale-105">
          <Link to="/contact">Contact</Link>
        </div>
        </>}
        </div>
    </div>
  );
};

export default Navbar;
