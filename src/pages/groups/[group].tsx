import { NextPage } from "next";

import { useSession } from "next-auth/react";

import { useRouter } from "next/router";
import { useState, useRef } from "react";

import AuthenticatedLayout from "~/layouts/AuthenticatedLayout";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/utils/api";

const GroupPage: NextPage = ({}) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { group } = router.query;
  const middleCheck = api.group.check.useQuery(group as string);

  const mutation = api.group.add.useMutation({
    onSuccess: async (input) => {
      console.log("added");
    },
  });

  if (middleCheck.data?.error) {
    router.push("/");
  }

  const countMoney = (data: any) => {
    let count = 0;
    data.forEach((val: any) => {
      count = count + val.amount;
    });

    return count;
  };

  if (status === "loading" || middleCheck.status == "loading") {
    return <p>Loading...</p>;
  }

  return (
    <AuthenticatedLayout>
      <button
        disabled={mutation.isLoading}
        className="rounded-sm bg-green-400 px-2 py-1"
        onClick={async () => {
          await mutation.mutateAsync();
          middleCheck.refetch();

          // setRefresh((prev) => !prev);
        }}
      >
        Create
      </button>
      <span>{countMoney(middleCheck.data?.data || [])}</span>

      {mutation.isLoading ? <span>loading</span> : <span>finished</span>}
      {middleCheck.data?.data?.map((spending, index) => {
        return (
          <div
            className="inline-block rounded-md border bg-red-400 p-4"
            key={index}
          >
            <span>{spending.name}</span>
            <h1 className="text-2xl font-semibold">{spending.amount}</h1>
            {spending.users.map((val, index) => {
              return (
                <div key={`Deneme${index}`}>
                  <img src={val.image} width={40} height={40} alt="PF" />
                  <h1>{val.name}</h1>
                </div>
              );
            })}
          </div>
        );
      })}
    </AuthenticatedLayout>
  );
};

export default GroupPage;

export async function getServerSideProps(context: any) {
  const session = await getServerAuthSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
