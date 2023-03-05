import { NextPage } from "next";
import { getServerSession } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";

import { authOptions } from "~/server/auth";

const Login: NextPage = () => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Loading</div>;
  }

  return (
    <button className="bg-red-400 px-2 py-1" onClick={() => signIn("google")}>
      Sign In
    </button>
  );
};

export default Login;
export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
