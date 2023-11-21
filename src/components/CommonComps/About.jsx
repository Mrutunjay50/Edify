/* eslint-disable react/no-unescaped-entities */
import { about1, about2, about3,boy1, boy2, boy3 } from "../../assets";

const About = () => {
  return (
    <section className="relative font-playpen">
    {/* First */}
        <div className="mt-[6rem] flex flex-col items-center">
            <h1 className="text-[3rem] laptop:text-[6rem] mb-20">Who are we 
                <span className="">👀</span>
                <span className="text-[rgba(114,112,112,0.77)] text-[6.5rem]">?</span>
            </h1>
            <div className="flex flex-col pc:flex-row justify-around gap-5 pc:gap-[12rem]">
                <div className="text-3xl laptop:text-5xlflex flex-col gap-8">
                    <h1 className=" mt-10">Remain a step</h1>
                    <h1 className=" font-mono italic">ahead</h1>
                    <h1 className=" ">with us.</h1>
                    <h1 className=" ">Be different from Others.</h1>
                </div>
                <img src={about1} alt="" className="h-[17rem] rounded-tr-2xl rounded-bl-2xl"></img>
            </div>
            <div className="flex flex-col-reverse pc:flex-row justify-center gap-[8rem] mt-24">
                <img src={about2} alt="" className="h-[17rem] rounded-br-2xl rounded-tl-2xl ml-[7rem]"></img>
                <div className="flex flex-col gap-8">
                    <h1 className="text-5xl mt-10">What's our Goals <span className="text-6xl text-[rgb(115,112,112)]">?</span></h1>
                    <p className="text-xl inset-5 font-sans font-light">Lorem ipsum dolor sit amet consectetur adipisicing elit.<br/> Doloremque amet temporibus doloribus dolore. Excepturi veritatis <br/> sint, labore magni, ratione laboriosam commodi voluptate laudantium <br/> temporibus, nemonon eum velit? Mollitia at maiores tempora voluptatem<br/> libero, a, obcaecati quidem dolorum praesentium sequi<br/> repellendus facilis harum</p>
                </div>
            </div>
            <div className="flex flex-col pc:flex-row justify-around gap-5 pc:gap-[12rem] mt-28">
                <div className="flex flex-col gap-8 ml-[7rem]">
                    <h1 className="text-5xl mt-10">What's our missions <span className="text-6xl text-[rgb(115,112,112)]">?</span></h1>
                    <p className="text-xl inset-5 font-sans font-thin">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque amet temporibus doloribus dolore. Excepturi veritatis sint, labore magni,<br/> ratione laboriosam commodi voluptate laudantium temporibus, nemo non eum velit? Mollitia at maiores tempora voluptatem libero, a, obcaecati quidem<br/> dolorum praesentium sequi repellendus facilis harum quas ratione commodi, eaque nostrum iste voluptate</p>
                </div>
                <img src={about3} alt="" className="h-[17rem] rounded-tr-2xl rounded-bl-2xl mx-20 pc:mx-0 pc:mr-[7rem]"></img>
            </div>
        </div>
    {/* Second */}
        <div className="relative flex flex-col items-center">
            <div className="mt-[6rem]">
                <h1 className="text-[4rem] laptop:text-[6rem] mb-20">Our Team 
                    <span className="">✌️</span>
                </h1>
            </div>
            <div className="flex flex-col pc:flex-row justify-around gap-2 mb-16 ml-6">
                <img src={boy1} alt="" className=" w-[80%] pc:w-auto pc:h-[20rem] rounded-tr-2xl rounded-bl-2xl"></img>
                <div className="flex flex-col gap-8">
                    <h1 className="text-5xl mt-10">Panda</h1>
                    <h1 className="text-xl font-mono">This is bio.</h1>
                    <p className="text-xl inset-5 font-sans font-thin">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque amet temporibus doloribus dolore. Excepturi veritatis sint, labore magni,<br/> ratione laboriosam commodi voluptate laudantium temporibus, nemo non eum velit? Mollitia at maiores tempora voluptatem libero, a, obcaecati quidem<br/> dolorum praesentium sequi repellendus facilis harum quas ratione commodi, eaque nostrum iste voluptate</p>   
                </div>
            </div>
            <div className="flex flex-col pc:flex-row justify-around gap-2 mb-16 ml-6">
                <img src={boy3} alt="" className=" w-[80%] pc:w-auto pc:h-[20rem] rounded-tr-2xl rounded-bl-2xl"></img>
                <div className="flex flex-col gap-8">
                    <h1 className="text-5xl mt-10">Mritunjay Panda</h1>
                    <h1 className="text-xl font-mono">This is bio.</h1>
                    <p className="text-xl inset-5 font-sans font-thin">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque amet temporibus doloribus dolore. Excepturi veritatis sint, labore magni,<br/> ratione laboriosam commodi voluptate laudantium temporibus, nemo non eum velit? Mollitia at maiores tempora voluptatem libero, a, obcaecati quidem<br/> dolorum praesentium sequi repellendus facilis harum quas ratione commodi, eaque nostrum iste voluptate</p>   
                </div>
            </div>
        </div>
    </section>
  )
}

export default About;