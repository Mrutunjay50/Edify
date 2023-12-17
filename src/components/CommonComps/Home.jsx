import { Parallax } from "react-parallax";
import { homepage } from "../../assets";
import { Link } from "react-router-dom";
import CoursesMain from "../Student/Courses/CoursesMain";
import { useAuth } from "./LoginContext";
import AllCourses from "../Student/Courses/allCourses";

const Home = () => {
  const { userData } = useAuth();

  return (
    <div className="mt-[8vh] tablet:mt-[10vh]">
      <Parallax
        strength={-200}
        bgImage={homepage}
        blur={{ min: -8, max: 10 }}
        className="h-[100vh] laptop:h-[calc(100vh)]"
      >
        <div className="h-full tablet:w-[100vw] text-center text-5xl text-black mb-[7rem] mt-32">
          <div className="pc:ml-[18rem] flex flex-col bg-transparent items-center py-15">
            <h1 className="text-6xl tablet:text-8xl text-center pt-10 text-slate-800">
              {userData && userData.profession === "student" ? <>Learning</> : <>Teaching</>} is FUN,
              <br />{" "}
              <div className="mt-5 text-6xl text-black/40 font-thin font-sans italic">
                {" "}
                with our digit platform
              </div>
            </h1>
            <div className="flex flex-col">
              <div className=" text-xl tablet:text-2xl mt-12 px-16 text-black/60">
                we provide everything in a single place so that <br /> you don’t
                have to waste your time searching for it.
                <br />
                Let's have fun here!!!
              </div>
            </div>
            {userData && userData ? (
              <div className="flex justify-center items-center bg-transparent text-center px-2 rounded-md mt-12 text-3xl font-mono border-white text-slate-800 shadow-2xl border-b-2 pb-2">
                Welcome {userData.fullname} !!!
              </div>
            ) : (
              <Link to="/Signup">
                <button className="h-14 w-[15rem] pb-1 rounded-lg hover:bg-transparent bg-[#211b3e] text-white text-center mt-12 text-2xl hover:border-[1px] hover:border-slate-800 hover:text-slate-800">
                  {" "}
                  Sign up{" "}
                </button>
              </Link>
            )}
          </div>
        </div>
      </Parallax>

      {userData && userData.profession === "student" ? (
        <div className="-mt-12">
          <CoursesMain />
        </div>
      ) : (
        <div className="my-12 flex flex-col text-center text-[24px] font-semibold gap-4">
          <span>All Courses</span>
          <AllCourses />
        </div>
      )}
    </div>
  );
};
export default Home;
