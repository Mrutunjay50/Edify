import { useEffect } from "react";
import ProNavbar from "./ProNavbar.jsx";
import {
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillLinkedin,
} from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import { useAuth } from "../../CommonComps/LoginContext.jsx";
import { useState } from "react";
import axios from "axios";
import ProfileImage from "./ProfileImage.jsx";
import { useRanking } from "./RankingContext.jsx";

const EditProfile = () => {
  const { userData, setUserData } = useAuth();
  const { profileOn, setProfileOn } = useRanking();
  const [editData, setEditData] = useState({});

  useEffect(() => {
    // Initialize editData with userData when userData changes
    if (userData) {
      setEditData({
        profilePicture: userData.profilePicture || "",
        fullname: userData.fullname || "",
        username: userData.username || "",
        age: userData.age || 0,
        pronoun: userData.pronoun || "",
        bio: userData.bio || "",
        email: userData.email || "",
        inWhat: userData.inWhat || "",
        collegestudent: userData.collegestudent || "",
        schoolstudent: userData.schoolstudent || "",
        institute: userData.institute || "",
        passingyear: userData.passingyear || "",
        contact: userData.contact || "",
        socialacc: {
          instagram: userData.socialacc?.instagram || "",
          twitter: userData.socialacc?.twitter || "",
          linkedin: userData.socialacc?.linkedin || "",
        },
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditData((prevEditData) => {
      const updatedEditData = { ...prevEditData };

      if (name.startsWith("socialacc.")) {
        const socialaccProperty = name.split(".")[1];
        updatedEditData.socialacc[socialaccProperty] = value;
      } else {
        updatedEditData[name] = value;
      }

      return updatedEditData;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      for (const key in editData) {
        if (key === "profilePicture") {
          // Append the profilePicture file separately
          formData.append(key, editData[key]);
        } else if (key === "socialacc") {
          // Handle social account fields as an object
          const socialacc = editData[key];
          for (const subKey in socialacc) {
            formData.append(`socialacc.${subKey}`, socialacc[subKey]);
          }
        } else {
          formData.append(key, editData[key]);
        }
      }
      formData.append("_id", userData._id);
      formData.append("password", userData.password);
      const response = await axios.put(
        `https://edify-backend-service.onrender.com/update/${userData._id}`,
        // `http://localhost:8800/update/${userData._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const { token, user } = response.data;
      setUserData(user);

      document.cookie = `jwt=${token}; path=/; domain=localhost;`;
      // localStorage.setItem("jwt", token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-row items-start mb-10 w-full">
    <div className=" absolute pc:hidden top-[14vh] px-3 h-[6vh] w-[40px] bg-gray-300 flex justify-start items-center rounded-l-[50px] right-0">
          <FiChevronDown
            onClick={() => setProfileOn(!profileOn)}
            className={` ${
              profileOn ? "-rotate-90" : " rotate-90"
            } h-[20px] tablet:bottom-0 transition-all hover:scale-125 cursor-pointer z-50`}
          />
        </div>
        <ProNavbar className={"hidden pc:block z-40 pc:sticky pc:top-[15%] ml-3 mb-52 bg-white"} />
      {profileOn && <ProNavbar className={"absolute pc:hidden z-40 top-[8vh] tablet:top-[14vh] right-0 ml-3 mb-52 bg-white"} />}
      {userData ? (
        <form method="post" encType="multipart/form-data" className="w-full">
          <div className="flex flex-col pc:flex-row items-center gap-5 w-full">
            {/* left */}
            <div className="hidden pc:block flex-[2.1] pc:h-[88vh] pc:w-[26.4vw] -mt-[22rem] pt-10 border-r-[0.1px] border-r-black/60">
              <ProfileImage
                userData={userData}
                className={`flex flex-col gap-2 bg-white mt-[0.4rem] ml-4 pt-8`}
              />
            </div>
            {/* right */}
            <div className=" pc:flex-[2.85] h-full w-full pc:w-[30vw] pc:pt-6  bg-white border-r-[2px] border-black/20 pr-6">
              <div className="flex flex-col justify-start pt-[6rem] px-2 gap-[0.6rem] mb-5">
                <h1 className="text-2xl">Personal Info</h1>
                <div className="flex flex-row relative items-center">
                  <input
                    type="file"
                    accept=".jpg, .jpeg, .png" // Allow only image files
                    name="profilePicture"
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        profilePicture: e.target.files[0],
                      })
                    }
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <div className="shrink-0">
                    {userData.profilePicture ? (
                      <img
                        src={`https://edify-backend-service.onrender.com/${userData.profilePicture}`}
                        alt="Profile Picture"
                        className="w-16 h-16 object-cover object-top rounded-full"
                      />
                    ) : (
                      <img
                        className="w-16 h-16 rounded-full"
                        src="https://cdn.pixabay.com/photo/2016/04/22/04/57/graduation-1345143__340.png"
                        alt="profile photo"
                      />
                    )}
                  </div>
                </div>
                <label>Name</label>
                <input
                  name="fullname"
                  className="border-[1px] pl-2 -mt-2 pt-1 pb-1 rounded-lg"
                  placeholder={userData.fullname}
                  onChange={handleChange}
                />
                <label>Username</label>
                <input
                  name="username"
                  className="border-[1px] pl-2 -mt-2 pt-1 pb-1 rounded-lg"
                  placeholder={userData.username}
                  onChange={handleChange}
                />
                <label>Pronoun</label>
                <select
                  name="pronoun"
                  className="border-[1px] pl-2 -mt-2 pt-1 pb-1 rounded-lg"
                  defaultValue={userData.pronoun}
                  onChange={handleChange}
                >
                  <option value=""></option>
                  <option value="She/her">She</option>
                  <option value="he/him">He</option>
                </select>
                <label>Age</label>
                <input
                  name="age"
                  className="border-[1px] pl-2 -mt-2 pt-1 pb-1 rounded-lg"
                  placeholder={userData.age}
                  onChange={handleChange}
                />
                <label>Bio</label>
                <textarea
                  name="bio"
                  className="border-[1px] pl-2 -mt-2 pt-1 pb-1 rounded-lg"
                  placeholder={userData.bio}
                  onChange={handleChange}
                  rows="4"
                />
                <label>Email</label>
                <input
                  name="email"
                  className="border-[1px] pl-2 -mt-2 pt-1 pb-1 rounded-lg"
                  placeholder={userData.email}
                  onChange={handleChange}
                />
                <label>Phone no.</label>
                <input
                  name="contact"
                  className="border-[1px] pl-2 -mt-2 pt-1 pb-1 rounded-lg"
                  placeholder={userData.contact}
                  onChange={handleChange}
                />
                <div className="text-2xl">Social Accounts</div>
                <label>
                  <AiFillInstagram className="text-xl mb-2" />
                </label>
                <input
                  name="socialacc.instagram"
                  className="border-[1px] pl-2 -mt-2 pt-1 pb-1 rounded-lg"
                  placeholder={userData?.socialacc?.instagram || ""}
                  onChange={handleChange}
                />
                <label>
                  <AiFillTwitterCircle className="text-xl mb-2" />
                </label>
                <input
                  name="socialacc.twitter"
                  className="border-[1px] pl-2 -mt-2 pt-1 pb-1 rounded-lg"
                  placeholder={userData?.socialacc?.twitter || ""}
                  onChange={handleChange}
                />
                <label>
                  <AiFillLinkedin className="text-xl mb-2" />
                </label>
                <input
                  name="socialacc.linkedin"
                  className="border-[1px] pl-2 -mt-2 pt-1 pb-1 rounded-lg mb-4"
                  placeholder={userData?.socialacc?.linkedin || ""}
                  onChange={handleChange}
                />
                <button
                  onClick={handleSubmit}
                  className="border-[1px] pl-2 -mt-2 pt-1 pb-1 rounded-lg text-center bg-black/90 text-white/80 hover:bg-white/70 hover:text-black/60"
                >
                  Save
                </button>
                <button className="border-[1px] pl-2 -mt-2 pt-1 pb-1 rounded-lg text-center bg-black/90 text-white/80 hover:bg-white/70 hover:text-black/90 hover:font-semibold">
                  Cancel
                </button>
              </div>
            </div>
            {/* extremeRight */}
            <div className="flex-[2.5] h-[100%] w-full">
              <div className="flex flex-col justify-start gap-4">
                <h1 className="text-2xl">Basic Details</h1>
                <div className="flex gap-5 ">
                  <div
                    className={`text-center h-[8rem] w-[8rem]  ${
                      userData.inWhat === "school"
                        ? " bg-blue-400 text-white"
                        : "bg-[rgb(236,237,240)] text-blue-400"
                    } rounded-xl pt-11 cursor-pointer`}
                  >
                    <h1 className="text-[20px] font-mono font-semibold  text-center">
                      School
                    </h1>
                  </div>
                  <div
                    className={`text-center h-[8rem] w-[8rem] ${
                      userData.inWhat === "college"
                        ? " bg-blue-400 text-white"
                        : "bg-[rgb(230,233,250)] text-blue-400"
                    } rounded-xl pt-11 cursor-pointer`}
                  >
                    <h1 className="text-[20px] font-mono font-semibold  text-center">
                      College
                    </h1>
                  </div>
                </div>
                {userData.inWhat && userData.inWhat === "college" ? (
                  <select
                    name="collegestudent"
                    className="border-[1px] pl-2 -mt-2 pt-1 pb-1 rounded-lg w-[20vw]"
                    defaultValue={userData.collegestudent}
                    onChange={handleChange}
                  >
                    <option value="">Qualification</option>
                    <option value="Bsc">B.Sc</option>
                    <option value="Btech">B.Tech</option>
                  </select>
                ) : (
                  <select
                    name="schoolstudent"
                    className="border-[1px] pl-2 -mt-2 pt-1 pb-1 rounded-lg w-[20vw]"
                    defaultValue={userData.schoolstudent}
                    onChange={handleChange}
                  >
                    <option value="">class</option>
                    <option value="6">6th</option>
                    <option value="7">7th</option>
                    <option value="8">8th</option>
                    <option value="9">9th</option>
                    <option value="10">10th</option>
                    <option value="11">11th</option>
                    <option value="12">12th</option>
                  </select>
                )}
                <input
                  name="institute"
                  className="border-[1px] pl-2 -mt-2 pt-1 pb-1 rounded-lg w-[20vw]"
                  placeholder={userData.institute}
                  aria-placeholder="institue/school"
                  onChange={handleChange}
                />
                <input
                  name="passingyear"
                  className="border-[1px] pl-2 -mt-2 pt-1 pb-1 rounded-lg w-[20vw]"
                  placeholder={userData.passingyear}
                  aria-placeholder="Year of Passing"
                  onChange={handleChange}
                />
                <button
                  onClick={handleSubmit}
                  className="border-[1px] -mt-2 pt-1 pb-1 w-[20%] pc:w-[10vw] rounded-lg text-center bg-black/90 text-white/80 hover:bg-white/70 hover:text-black/60"
                >
                  Save
                </button>
                <button className="border-[1px] -mt-2 pt-1 pb-1 w-[20%] pc:w-[12vw] rounded-lg text-center bg-black/90 text-white/80 hover:bg-white/70 hover:text-black/90 hover:font-semibold">
                  Cancel
                </button>
                <div className="text-center h-[24rem] w-[8rem] bg-white rounded-xl pt-11"></div>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="text-2xl text-black/50">Loading...</div>
      )}
    </div>
  );
};

export default EditProfile;
