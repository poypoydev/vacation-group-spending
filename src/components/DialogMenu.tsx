import { api } from "~/utils/api";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlinePlus } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { Formik } from "formik";
import { userSpender } from "@prisma/client";

const DialogMenu: FC<{
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  refetch: any;
  users: userSpender[] | undefined;
}> = ({ open, setOpen, refetch, users }) => {
  return (
    <AnimatePresence initial={false}>
      <motion.div
        animate={{
          scale: open ? 1 : 0,
          translateY: "-50%",
          opacity: open ? 1 : 0,
        }}
        transition={{ duration: 0.6, opacity: { duration: 0.3 } }}
        className="fixed inset-x-0 top-1/2 m-auto h-auto  w-[85%] -translate-y-1/2 border bg-white p-3 shadow-md"
      >
        <div className=" relative flex w-[100%] items-center justify-between  py-2">
          <span className="text-lg font-semibold">Add a Spending</span>
          <div
            onClick={() => setOpen(false)}
            className="rounded-md  bg-red-600 p-1 shadow-md"
          >
            <RxCross2 color="white" />
          </div>
        </div>
        <div className="mt-2">
          <Formik
            initialValues={{ name: "", amount: "" }}
            validate={(values) => {
              const errors: any = {};

              if (!values.name) {
                errors.name = "Required";
              }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(async () => {
                /// mutate with input
                await refetch(values);

                setSubmitting(false);
                setOpen(false);
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
                <label
                  htmlFor="name"
                  className="relative bottom-1  text-[#AAA]"
                >
                  Spending
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  placeholder="Plane Tickets e.g"
                  className=" mb-2 w-full rounded-sm border py-2 px-2  outline-none"
                />
                {errors.name && (
                  <p className="mb-2 text-red-500">{errors.name}</p>
                )}
                <label
                  htmlFor="amount"
                  className="relative bottom-1  text-[#AAA]"
                >
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.amount}
                  className=" w-full rounded-sm border py-2 px-2 outline-none"
                />
                {errors.name && (
                  <p className="mb-2 text-red-500">{errors.name}</p>
                )}
                <h1 className=" mt-2 text-[#AAA]">
                  Check the users you want to add to this spending.
                </h1>
                <div className="mt-3 flex flex-wrap items-center rounded-md border py-2 ">
                  {users?.map((val, index) => {
                    return <UserCheck user={val} />;
                  })}
                </div>
                <button
                  type="submit"
                  className="mt-2 rounded-md bg-green-400 py-2 px-5 "
                  disabled={isSubmitting}
                >
                  <AiOutlinePlus />
                </button>
              </form>
            )}
          </Formik>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const UserCheck: FC<{ user: userSpender }> = ({ user }) => {
  const [checked, setChecked] = useState<boolean>(false);
  return (
    <motion.div
      onClick={() => setChecked((prev) => !prev)}
      className="mx-2  rounded-md border"
    >
      <motion.div
        animate={{
          opacity: checked ? 0.4 : 1,
        }}
        className="inline-flex items-center justify-between   px-2 py-2"
      >
        <div
          style={{
            background: `url('${user.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="mr-3 h-6 w-6 rounded-sm"
        />
        <h1>{user.name}</h1>
      </motion.div>
    </motion.div>
  );
};

export default DialogMenu;
