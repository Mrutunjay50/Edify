import { useEffect, useState } from "react";
import ProNavbar from "./ProNavbarT.jsx";
import {
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillLinkedin,
} from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import { useAuth } from "../../CommonComps/LoginContext.jsx";
import axios from "axios";
import ProfileImage from "./ProfileImageT.jsx";

const EditProfileT = () => {
  const { userData, setUserData } = useAuth();
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
        experience : userData.experience || "",
        classes : userData.classes || "",
        subjects : userData.subjects || "",
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
        `https://edify-backend-service.onrender.com/updateteacher/${userData._id}`,
        // `http://localhost:8800/updateteacher/${userData._id}`,
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
      <ProNavbar
        className={
          "hidden pc:block z-40 pc:sticky pc:top-[15%] ml-3 mb-52 bg-white"
        }
      />
      {userData ? (
        <form method="post" encType="multipart/form-data" className="w-full">
          <div className="flex flex-col pc:flex-row items-center gap-5 w-full">
            {/* left */}
            <div className="hidden pc:block flex-[2.1] pc:h-[88vh] pc:w-[26.4vw] -mt-[42%]  pt-10 border-r-[0.1px] border-r-black/60">
              <ProfileImage
                userData={userData}
                className={`flex flex-col gap-2 bg-white ml-4 pt-0`}
              />
            </div>
            {/* right */}
            <div className=" pc:flex-[2.85] h-full w-full pc:w-[30vw] pc:pt-4  bg-white border-r-[2px] border-black/20 pr-6">
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
                <label>Experience</label>
                <input
                  name="experience"
                  className="border-[1px] pl-2 -mt-2 pt-1 pb-1 rounded-lg"
                  placeholder={userData.experience}
                  onChange={handleChange}
                />
                <label>Classes</label>
                <input
                  name="classes"
                  className="border-[1px] pl-2 -mt-2 pt-1 pb-1 rounded-lg"
                  placeholder={userData.classes}
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
            <div className="  relative w-full pc:-left-[3.8rem] pc:h-[88vh] pc:w-[30rem] pc:ml-[5%] -mt-[30%] flex flex-col gap-5 ">
              <div className="flex flex-col relative min-h-[10vh] gap-2 font-semibold text-[20px]">
                Can Teach
                <div className="flex flex-wrap gap-10 ">
                  {userData.classes &&
                    userData.classes
                      .split(",")
                      .map((item, index) => (
                        <div className=" w-[100px] h-[50px] hover:text-white hover:bg-blue-500 transition-colors text-[20px] font-semibold cursor-pointer border-2 border-blue-300 flex items-center justify-center rounded-md">
                          {" "}
                          {item}
                        </div>
                      ))}
                </div>
              </div>
              <div className="flex flex-col relative min-h-[10vh] gap-2 font-semibold text-[20px]">
                Subjects Taught
                <div className="flex flex-col gap-2 ">
                  {userData.classes &&
                    userData.classes
                      .split(",")
                      .map((item, index) => (
                        <div className=" max-w-[350px] min-h-[40px] hover:text-white hover:bg-blue-500 transition-colors text-[20px] font-semibold cursor-pointer border-2 border-blue-300 flex items-center justify-center rounded-[4px]">
                          {" "}
                          {item}
                        </div>
                      ))}
                </div>
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

export default EditProfileT;
