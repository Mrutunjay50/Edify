import ProNavbar from "./ProNavbar";

const AccountSetting = () => {
  return (
    <>
    <div className="h-[calc(100vh-14vh)] flex flex-row items-start mb-10 font-playpen mt-[14vh] relative">
    <div className="text-center text-[32px] font-playpen mb-10 absolute w-full top-5">Account Settings</div>
        <ProNavbar className={"sticky top-[15%] ml-3 mb-52 w-[20%]"}/>
        
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