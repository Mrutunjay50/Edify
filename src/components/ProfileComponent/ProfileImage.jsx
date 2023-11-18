import React from "react";

const ProfileImage = ({ userData, className }) => {
  return (
    <>
      
        <div className={className}>
        {userData ? (
            <>
              <div className="h-[15rem] w-[15rem] rounded-full shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                {userData.profilePicture ? (
                  <img
                    src={`http://localhost:8800/${userData.profilePicture}`}
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
              <div className="text-3xl">{userData.fullname}</div>
              <div className="text-2xl text-black/50">
                {userData.username} • {userData.pronoun}
              </div>
              <div className="text-xl text-black/80">{userData.bio}</div>
              <div className="text-md text-black/70">{userData.email}</div>
              <div className="text-md text-black/70">{userData.contact}</div>
            </>
          ) : (
            <div className="text-2xl text-black/50">Loading...</div>
          )}
        </div>
    </>
  );
};

export default ProfileImage;
