import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { FC } from "react";
import { ImExit, ImCog, ImUser, ImAirplane } from "react-icons/im";
import { FaHandPeace } from "react-icons/fa";

import { signOut } from "next-auth/react";

const NavDropMenu: FC<{ image: string; name: string }> = ({ image, name }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="mr-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white outline-black "
          aria-label="Customise options"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
          }}
        />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="mr-3 min-w-[15%] rounded-md border bg-white p-2 shadow-md "
          sideOffset={5}
        >
          <DropdownMenu.Item className="text-md mb-1 flex h-6 select-none items-center rounded-sm py-2 font-semibold outline-none md:px-1">
            {name}{" "}
          </DropdownMenu.Item>
          <DropdownMenu.Separator className=" h-[1px] w-full bg-[#DCDCDC] " />
          <DropdownMenu.Item className="mb-1 mt-1 flex h-6 select-none items-center rounded-sm  py-2 text-[13px] outline-none md:px-1">
            <div className="relative right-[1px] mr-auto mt-[4px] pr-[5px]">
              <ImUser size={16} />
            </div>
            Account{" "}
          </DropdownMenu.Item>
          <DropdownMenu.Item className="mb-1 flex h-6 select-none items-center rounded-sm  py-2 text-[13px] outline-none md:px-1">
            <div className="relative  mr-auto mt-[4px] pr-[22px]">
              <ImAirplane size={14} />
            </div>
            My Groups{" "}
          </DropdownMenu.Item>
          <DropdownMenu.Item className="mb-2 flex h-6 select-none items-center rounded-sm  py-2 text-[13px] outline-none md:px-1">
            <div className="relative right-[1px] mr-auto mt-[5px] pr-[5px]">
              <ImCog size={15} />
            </div>
            Settings{" "}
          </DropdownMenu.Item>
          <DropdownMenu.Separator className=" h-[1px] w-full bg-[#DCDCDC] " />
          <DropdownMenu.Item
            onClick={() => signOut()}
            className="flex h-6 select-none items-center rounded-sm  py-2  text-[13px] text-[#77878b] outline-none md:px-1"
          >
            <div className="mr-auto mt-[5px] pr-1">
              <ImExit size={15} />
            </div>
            Log Out{" "}
          </DropdownMenu.Item>

          <DropdownMenu.Arrow className="fill-slate-400 " />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default NavDropMenu;
