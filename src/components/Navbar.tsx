import { useSession } from "next-auth/react";
import { FC } from "react";
import NavDropMenu from "./NavDropMenu";

const Navbar: FC = () => {
  const { data: session } = useSession();
  return (
    <div className="flex h-[8%]  w-full  items-center justify-between border-b bg-[#F0F2EF] shadow-sm">
      <h1 className="ml-2 text-xl font-semibold">
        Vacation<span className="font-bold text-2xl text-[#1985A1]">Spender</span>
      </h1>

      {/* <span>{session?.user.image}</span> */}
      {/* <div
        className="mr-2 h-10 w-10 rounded-full bg-red-300"
        style={{
          backgroundImage: `url(${session?.user.image})`,
          backgroundSize: "cover",
        }}
      /> */}
      {/* <p>{JSON.stringify(session)}</p> */}
      <NavDropMenu
        image={session?.user.image || ""}
        name={session?.user.name?.split(" ")[0] || ""}
      />
    </div>
  );
};

export default Navbar;
