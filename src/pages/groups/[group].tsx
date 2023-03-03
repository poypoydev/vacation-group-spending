import { NextPage } from "next";
import { getServerSession, Session } from "next-auth";
import { useRouter } from "next/router";
import { authOptions } from "~/server/auth";
import { api } from "~/utils/api";

const GroupPage: NextPage<{ session: Session }> = ({ session }) => {
  const router = useRouter();
  const { group } = router.query;
  const middleCheck = api.example.check.useQuery(group as string);

  return <span>{JSON.stringify(middleCheck.data)}</span>;
};

export default GroupPage;

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);

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
