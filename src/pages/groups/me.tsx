import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FC } from "react";
import AuthenticatedLayout from "~/layouts/AuthenticatedLayout";
import { api } from "~/utils/api";

const MePage: NextPage = () => {
  const { data, status } = api.group.getAll.useQuery();
  const { data: session } = useSession();
  if (status === "loading") {
    return <p>Loading</p>;
  }
  return (
    <AuthenticatedLayout>
      <div className="mt-8 ml-3">
        <h1 className=" text-xl ">
          Welcome back,{" "}
          <span className="font-semibold">
            {session?.user.name?.split(" ")[0]}
          </span>
        </h1>
        <p className="text=sm text-[#393939aa]">
          Here are your active spending groups.
        </p>
      </div>
      <div className="flex w-full justify-center">
        {data?.data?.map((val, index) => {
          return (
            <SpendingGroupCard
              id={val.id}
              name={val.name}
              image={val.groupImage}
            />
          );
        })}
      </div>
    </AuthenticatedLayout>
  );
};

type SpendingGroup = {
  name: string;
  image: string;
  id: string;
};

const SpendingGroupCard: FC<SpendingGroup> = ({ name, image, id }) => {
  return (
    <div className="my-2 flex w-[95%] items-center  rounded-md border py-2 shadow-sm">
      <div
        className=" ml-3 h-10 w-10 rounded-full border  "
        style={{
          backgroundImage: `url('${image}')`,
          backgroundSize: "cover",
        }}
      />
      <Link href={`/groups/${id}`} className="ml-4 text-xl">
        {name}
      </Link>
    </div>
  );
};

export default MePage;
