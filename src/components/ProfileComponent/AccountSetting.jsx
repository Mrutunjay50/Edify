import ProNavbar from "./ProNavbar";
import { FiChevronDown } from "react-icons/fi";
import { useRanking } from "./RankingContext.jsx";

const AccountSetting = () => {
  const { profileOn, setProfileOn } = useRanking();
  return (
    <>
    <div className="h-[calc(100vh-14vh)] flex flex-row items-start mb-10 font-playpen mt-[14vh] relative">
    <div className="text-center text-[32px] font-playpen mb-10 absolute w-full top-5">Account Settings</div>
    <div className=" absolute pc:hidden -top-10 px-3 h-[6vh] w-[100px] bg-gray-300 flex justify-start items-center rounded-[50px] -right-16">
          <FiChevronDown
            onClick={() => setProfileOn(!profileOn)}
            className={` ${
              profileOn ? "-rotate-90" : " rotate-90"
            } h-[20px] tablet:bottom-0 transition-all hover:scale-125 cursor-pointer z-50`}
          />
        </div>
        <ProNavbar className={"hidden pc:block z-40 pc:sticky pc:top-[15%] ml-3 mb-52 bg-white"} />
        {profileOn &&  <ProNavbar className={"absolute pc:hidden z-40 top-[0] right-0 pc:sticky pc:top-[15%] ml-3 mb-52 bg-white"} />}
        
        <div className="flex-1 mt-20">
          <ul>
            <li>Reset Your Password</li>
            <li>Account Information</li>
            <li> Download an archive of your data</li>
            <li>deactivate your account</li>
            <li>Help Center</li>
          </ul>
        </div>
    </div>
    </>
  )
}

export default AccountSetting;