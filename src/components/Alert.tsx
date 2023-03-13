import { FC } from "react";
import { motion } from "framer-motion";
import { AiOutlineCheck } from "react-icons/ai";

const Alert: FC<{ open: string }> = ({ open }) => {
  return (
    <motion.div
      initial={{ x: "110%" }}
      animate={{ x: open !== "" ? 0 : "110%" }}
      transition={{ ease: "easeInOut", duration: 0.7 }}
      className="fixed right-0 bottom-0  m-5 inline-flex items-center rounded-md border px-3  py-3 shadow-md"
    >
      <div className="mr-3 rounded-md  bg-[#04A777] p-1 text-white">
        <AiOutlineCheck size={20} />
      </div>
      <span>{open}</span>
    </motion.div>
  );
};

export default Alert;
