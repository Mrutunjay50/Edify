/* eslint-disable react/no-unescaped-entities */
import {textVariant} from "../utils/motion";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="container mx-auto mt-32 font-playpen">
    {/* heading*/}
    <div className="flex flex-col gap-3 items-center">
        <motion.div variants={textVariant()} className="flex flex-col items-center">
        <h3 className="text-3xl text-black/60 font-mono italic">Get in touch <span className="text-black">😎</span></h3>
        <h3 className="text-5xl text-[rgba(13,36,62,0.95)] mt-4 mb-2 mr-8">Contact</h3>
        </motion.div>
        <p className="w-1/2 text-center text-[rgba(53,101,155,0.95)] text-lg">
            Do you have an idea? Let's discuss it and see what we can do together.
        </p>
    </div>
    {/* content */}
    <form className="mt-5 p-8 flex flex-col gap-5 items-center" action="https://formspree.io/f/mqkowekv" method="POST">
        <input className="p-2 2xl:w-[50%] lg:w-[50%] md:w-[80%] sm:w-[88%] w-full ring-1 rounded-sm bg-black/5 focus:outline-none border-[2.5px] border-white transition-all hover:scale-105" type="text" name="Name" placeholder="Full Name" />
        <input className="p-2 2xl:w-[50%] lg:w-[50%] md:w-[80%] sm:w-[88%] w-full ring-1 rounded-sm bg-black/5 focus:outline-none border-[2.5px] border-white transition-all hover:scale-105" type="email" name="email" placeholder="Email" />
        <textarea className="p-2 2xl:w-[50%] lg:w-[50%] md:w-[80%] sm:w-[88%] w-full ring-1 rounded-sm bg-black/5 focus:outline-none border-[2.5px] border-white transition-all hover:scale-105" cols="30" rows="10" required autoComplete="off" name="Message" placeholder="Message..."></textarea>
        <button className="w-1/2 bg-[rgba(13,36,62,0.95)] text-white font-medium px-3 py-2 rounded-md cursor-pointer transition-all hover:scale-x-105 hover:bg-[rgba(53,101,155,0.95)]">
            Submit
        </button>
    </form>
</div>
  )
}

export default Contact;