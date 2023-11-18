import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";

const Caret = () => {
  return (
    <motion.div
      aria-hidden={true}
      initial={{ opacity: 1}}
      animate={{ opacity: 0}}
      exit={{ opacity: 1 }}
      transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
      className="inline-block bg-[#516ce6] w-0.5 h-6"
    />
  );
};

export default Caret;