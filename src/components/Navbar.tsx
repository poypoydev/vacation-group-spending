import { useSession } from "next-auth/react";
import { FC } from "react";
import NavDropMenu from "./NavDropMenu";
import DropdownMenuDemo from "./NavDropMenu";

const Navbar: FC = () => {
  const { data: session } = useSession();
  return (
    <div className="flex h-[8%]  w-full  items-center justify-between border-b bg-[#F0F2EF] shadow-sm">
      <span>fix</span>
      {/* <span>{session?.user.image}</span> */}
      {/* <div
        className="mr-2 h-10 w-10 rounded-full bg-red-300"
        style={{
          backgroundImage: `url(${session?.user.image})`,
          backgroundSize: "cover",
        }}
      /> */}
      <NavDropMenu
        image={session?.user.image || ""}
        name={session?.user.name?.split(" ")[0] || ""}
      />
    </div>
  );
};

export default Navbar;
