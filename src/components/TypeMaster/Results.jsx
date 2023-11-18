import { motion } from "framer-motion";


const formatPercentage = (percentage) => {
    return percentage.toFixed(0) + "%";
  };

const Results = ({
  state,
  errors,
  accuracyPercentage,
  total,
}) => {
  if (state !== "finish") {
    return null;
  }


  const initial = { opacity: 0 };
  const animate = { opacity: 1 };

  return (
    <motion.ul
      initial={initial}
      animate={animate}
      className={`bg-[#f5f5f2] flex flex-col items-center text-primary-400 space-y-3 mb-10 mt-8`}
    >
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ duration: 0.3 }}
        className="text-xl font-semibold"
      >
        Results
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        Accuracy: {formatPercentage(accuracyPercentage)}
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ duration: 0.3, delay: 1 }}
        className="text-red-500"
      >
        Errors: {errors}
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ duration: 0.3, delay: 1.4 }}
      >
        Typed: {total}
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ duration: 0.3, delay: 1.4 }}
      >
        {total}WPM
      </motion.li>
    </motion.ul>
  );
};

export default Results;
