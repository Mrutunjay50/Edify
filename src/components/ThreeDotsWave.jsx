import { motion } from "framer-motion";
import React from "react";

const LoadingDot = {
  display: "block",
  width: "0.5rem",
  height: "0.5rem",
  backgroundColor: "black",
  borderRadius: "50%"
};

const ContainerVariants = {
  initial: {
    transition: {
      staggerChildren: 0.2
    }
  },
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const DotVariants = {
    initial: {
      y: "0%"
    },
    animate: {
      y: ["0%", "100%", "0%"], // Use an array to create a smooth back and forth animation
      transition: {
        duration: 1, // Adjust the duration to control the speed of the animation
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

export default function ThreeDotsWave({className}) {
  return (
    <div
    // className=" bg-transparent w-[100px] h-[60px] flex flex-row items-center justify-center m-5 rounded-t-[15px] rounded-bl-[15px] border-2"
    className={className}
    >
      <motion.div
        className=" flex flex-row items-center gap-1"
        variants={ContainerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.div
          style={LoadingDot}
          variants={DotVariants}
        />
        <motion.div
          style={LoadingDot}
          variants={DotVariants}
        />
        <motion.div
          style={LoadingDot}
          variants={DotVariants}
        />
      </motion.div>
    </div>
  );
}
