import { Route, Routes } from "react-router-dom";
import {
  AccountSetting,
  EditProfile,
  LeaderBoard,
  Profile,
} from "./components/ProfileComponent";
import {
  Home,
  Navbar,
  About,
  CoursesMain,
  ViewCourse,
  StudyMaterial,
  Login,
  Signup,
  Contact,
  Newsletter,
  Footer,
  ChatBot,
} from "./components";
import ProtectedRoute from "./ProtectedRoute";
import RouteGuard from "./RouteGuard";
import MainType from "./components/TypeMaster/MainType";
import TestCraetionForm from "./components/testCraetionForm";
import { useAuth } from "./components/CommonComps/LoginContext";
import { BsChatRightFill } from "react-icons/bs";
import { useState } from "react";
import { RankingProvider } from "./components/ProfileComponent/RankingContext";
import ScoreUpdater from "./components/testScoreUpdater";


const App = () => {
  const { userData } = useAuth();
  const [chatIsOpen, setChatIsOpen] = useState(false);
  return (
    <>
      <Navbar />
      {userData && (
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
      <RankingProvider >
        <Routes>
          <Route path="/Edify" element={<Home />} />
          <Route path="/Edify/about" element={<About />} />
          <Route path="/Edify/courses" element={<CoursesMain />} />
          <Route path="/Edify/studymaterial" element={<StudyMaterial />} />
          <Route path="/Edify/login" element={<Login />} />
          <Route path="/Edify/signup" element={<Signup />} />
          <Route path="/Edify/contact" element={<Contact />} />
          <Route path="/Edify/testcreation" element={<TestCraetionForm />} />
          <Route path="/Edify/scoreupdator" element={<ScoreUpdater />} />
          <Route path="Edify" element={<ProtectedRoute />}>
            <Route path="typechecker" element={<MainType />} />
            <Route path="settings" element={<AccountSetting />} />
            <Route path="editprofile" element={<EditProfile />} />
            <Route path="leaderboard" element={<LeaderBoard />} />
            <Route path="profile" element={<Profile />} />
            <Route element={<RouteGuard />}>
              <Route path=":inWhat/:course/:subject" element={<ViewCourse />} />
            </Route>
          </Route>
        </Routes>
      </RankingProvider>
      <Newsletter />
      <Footer />
      <ChatBot />
    </>
  );
};

export default App;
