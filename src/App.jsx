import { Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import { BsChatRightFill } from "react-icons/bs";
import { useAuth } from "./components/CommonComps/LoginContext";
import { Navbar, Home, About, CoursesMain, ViewCourse, StudyMaterial, Login, Signup, Contact, Newsletter, Footer, ChatBot } from "./components";
import ProtectedRoute from "./ProtectedRoute";
import RouteGuard from "./RouteGuard";
import MainType from "./components/TypeMaster/MainType";
import TestCreationSheet from "./components/QuestionCreation/TestCreationSheet";
import QuestionAns from "./components/QuestionAnswer/QuestionAns";
import TestPage from "./components/QuestionAnswer/TestPage";
import { RankingProvider } from "./components/Student/ProfileComponent/RankingContext";
import ScoreUpdater from "./components/testScoreUpdater";
import { AccountSetting, EditProfile, LeaderBoard, Profile } from "./components/Student/ProfileComponent";
import { Dashboard, EditProfileT, ProfileT } from "./components/Teacher/TeacherProfile";
import GoogleStPopUp from './components/Student/Credentials/GoogleStPopUp'

const App = () => {
  const { userData } = useAuth();
  const [chatIsOpen, setChatIsOpen] = useState(false);
  // Check if the current route is '/googlesignup'
  const isGoogleSignupRoute = window.location.pathname === '/googlesignup';

  return (
    <>
      {!isGoogleSignupRoute && <Navbar />}
      {userData && !isGoogleSignupRoute && (
        <>
          <ChatBot isOpen={chatIsOpen} />
          <div
            onClick={() => setChatIsOpen(!chatIsOpen)}
            style={{
              boxShadow: "-3px 3px 8px #c5c5c5,-3px -3px  8px #ffffff",
            }}
            className={`cursor-pointer z-50 bg-white text-[#585555] w-[35px] h-[35px] fixed bottom-4 right-4 rounded-md flex justify-center items-center`}
          >
            <BsChatRightFill />
          </div>
        </>
      )}
      <RankingProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route exact path="/googlesignup" element={<GoogleStPopUp/>} />

          {userData && userData.profession === "teacher/professor" && (<>
            <Route path="/testcreation" element={<TestCreationSheet />} />
            <Route path="/test" element={<QuestionAns />} />
            <Route path="/testQuestions/:id" element={<TestPage teacher={true} />} />
            <Route path="/scoreupdator" element={<ScoreUpdater />} />
            <Route path="" element={<ProtectedRoute />}>
                {/* <Route path="settings" element={<AccountSetting />} /> */}
                <Route path="editprofile" element={<EditProfileT />} />
                <Route path="profile" element={<ProfileT />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route element={<RouteGuard />}>
                  <Route path=":inWhat/:course/:subject" element={<ViewCourse />}/>
                </Route>
              </Route>
          </>)}
          {userData && userData.profession === "student" && (
            <>
              <Route path="/courses" element={<CoursesMain />} />
              <Route path="/studymaterial" element={<StudyMaterial />} />
              <Route path="" element={<ProtectedRoute />}>
                <Route path="typechecker" element={<MainType />} />
                <Route path="settings" element={<AccountSetting />} />
                <Route path="editprofile" element={<EditProfile />} />
                <Route path="leaderboard" element={<LeaderBoard />} />
                <Route path="profile" element={<Profile />} />
                <Route element={<RouteGuard />}>
                  <Route
                    path=":inWhat/:course/:subject"
                    element={<ViewCourse />}
                  />
                </Route>
              </Route>
            </>
          )}
        </Routes>
      </RankingProvider>
      {!isGoogleSignupRoute && <Newsletter />}
      {!isGoogleSignupRoute && <Footer />}
      {!isGoogleSignupRoute && <ChatBot />}
    </>
  );
};

export default App;