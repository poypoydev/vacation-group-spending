import { NextPage } from "next";
import { api } from "~/utils/api";
import { FC, useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { Formik } from "formik";

const Playground: NextPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="bg-green-100">
      <button
        onClick={() => {
          setOpen(true);
          setTimeout(() => {
            setOpen(false);
          }, 4000);
        }}
      >
        Click me
      </button>
      <Alert open={open} />
      <DialogMenu open={open} />
    </div>
  );
};

export default Playground;

const Alert: FC<{ open: boolean }> = ({ open }) => {
  return (
    <motion.div
      initial={{ x: "110%" }}
      animate={{ x: open ? 0 : "110%" }}
      transition={{ ease: "easeInOut", duration: 0.7 }}
      className="fixed right-0 bottom-0  m-5 inline-flex items-center rounded-md border px-3  py-3 shadow-md"
    >
      <div className="mr-3 rounded-md  bg-[#04A777] p-1 text-white">
        <AiOutlineCheck size={20} />
      </div>
      <span>Added a new spending of 250$ to Poyraz's Group.</span>
    </motion.div>
  );
};

const DialogMenu: FC<{ open: boolean }> = ({ open }) => {
  return (
    <motion.div
      initial={{ scale: 0.3, translateY: "-40%" }}
      animate={{ scale: open ? 1 : 0, translateY: "-50%" }}
      transition={{ duration: 0.6 }}
      className="fixed inset-x-0 top-1/2 m-auto  h-auto w-[85%] -translate-y-1/2 border p-3 shadow-md"
    >
      <div className=" relative flex w-[100%] items-center justify-between  py-2">
        <span className="text-lg font-semibold">Add a Spending</span>
        <div className="rounded-md  bg-red-600 p-1 shadow-md">
          <RxCross2 color="white" />
        </div>
      </div>
      <div className="mt-2">
        <Formik
          initialValues={{ name: "", amount: "" }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));

              /// mutate with input

              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,

            errors,

            touched,

            handleChange,

            handleBlur,

            handleSubmit,

            isSubmitting,

            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <label htmlFor="name" className="relative bottom-1  text-[#AAA]">
                Spending
              </label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                placeholder="Plane Tickets e.g"
                className="mb-4 w-full rounded-sm border py-2 px-2 shadow-md outline-none"
              />
              <label
                htmlFor="amount"
                className="relative bottom-1  text-[#AAA]"
              >
                Amount
              </label>
              <input
                type="text"
                name="amount"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.amount}
                className="mb-2 w-full rounded-sm border py-2 px-2 shadow-md outline-none"
              />

              <button
                type="submit"
                className="rounded-md bg-green-400 py-2 px-5 "
                disabled={isSubmitting}
              >
                <AiOutlinePlus />
              </button>
            </form>
          )}
        </Formik>
      </div>
    </motion.div>
  );
};
