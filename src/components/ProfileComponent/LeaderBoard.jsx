import ProNavbar from "./ProNavbar";

const LeaderBoard = () => {
  return (
    <>
      <div className="h-[calc(100vh-14vh)] flex flex-row items-start mb-10 font-playpen mt-[14vh] relative">
        <div className="text-center text-[32px] font-playpen mb-10 absolute w-full top-5">
          Leader Boards
        </div>
        <ProNavbar className={"sticky top-[15%] ml-3 mb-52 w-[20%] "} />

        <div className="flex-1 mt-20">
          <div className=" w-[30%] flex flex-row items-center justify-between my-2 px-3 py-2 border-r-[3px] border-l-[3px] border-[#a09f9f] rounded-[3px]">
            <div className="h-[32px] w-[32px] bg-orange-500"></div>
            <span className="">Gold Ranking(#username)</span>
          </div>

          <div className=" w-[30%] flex flex-row items-center justify-between my-2 px-3 py-2 border-r-[3px] border-l-[3px] border-[#a09f9f] rounded-[3px]">
            <div className="h-[32px] w-[32px] bg-orange-500"></div>
            <span className="">Gold Ranking(#username)</span>
          </div>

          <div className=" w-[30%] flex flex-row items-center justify-between my-2 px-3 py-2 border-r-[3px] border-l-[3px] border-[#a09f9f] rounded-[3px]">
            <div className="h-[32px] w-[32px] bg-orange-500"></div>
            <span className="">Gold Ranking(#username)</span>
          </div>

          <div className=" w-[30%] flex flex-row items-center justify-between my-2 px-3 py-2 border-r-[3px] border-l-[3px] border-[#a09f9f] rounded-[3px]">
            <div className="h-[32px] w-[32px] bg-orange-500"></div>
            <span className="">Gold Ranking(#username)</span>
          </div>

          <div className=" w-[30%] flex flex-row items-center justify-between my-2 px-3 py-2 border-r-[3px] border-l-[3px] border-[#a09f9f] rounded-[3px]">
            <div className="h-[32px] w-[32px] bg-orange-500"></div>
            <span className="">Gold Ranking(#username)</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaderBoard;
