import { NextPage } from "next";

import { useSession } from "next-auth/react";

import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { FC, useState } from "react";
import AuthenticatedLayout from "~/layouts/AuthenticatedLayout";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/utils/api";
import { BsPlus } from "react-icons/bs";
import { Spending } from "@prisma/client";
import DialogMenu from "~/components/DialogMenu";
import Alert from "~/components/Alert";

const GroupPage: NextPage = ({}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [alert, setAlert] = useState<string>("");
  const mutation = api.group.add.useMutation({
    onSuccess: async (input) => {
      console.log("added");
    },
  });
  const { data: session, status } = useSession();
  const router = useRouter();
  const { group } = router.query;
  const middleCheck = api.group.check.useQuery(group as string);
  const handleRefetch = async (object: { name: string; amount: number }) => {
    await mutation.mutateAsync({
      name: object.name,
      amount: object.amount,
      groupId: group as string,
    });
    middleCheck.refetch();
    setAlert(
      `Added a new spending of ${object.amount}$ to ${middleCheck.data?.group?.name}`
    );
    setTimeout(() => {
      setAlert("");
    }, 4000);
  };
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
      {/*  */}
      <div
        className="mt-8 flex items-center justify-between   py-2
       "
      >
        <div className="ml-4">
          <h1 className=" relative bottom-[1px]  text-2xl font-semibold">
            {middleCheck.data?.group?.name}
          </h1>
          <span>{countMoney(middleCheck.data?.data || [])}$</span>
        </div>
        <motion.button
          whileHover={{
            scale: 1.2,
            transition: { duration: 1 },
          }}
          whileTap={{ scale: 0.9 }}
          className=" mr-2 mt-[1.5px] rounded-md bg-green-400 px-4 py-1"
          onClick={() => {
            // await mutation.mutateAsync();
            // middleCheck.refetch();
            // setRefresh((prev) => !prev);
            setOpen(true);
          }}
        >
          <BsPlus size={22} />
        </motion.button>
      </div>
      <div className=" flex w-full flex-wrap justify-center ">
        {middleCheck.data?.data?.map((spending, index) => {
          return <Spending key={index} spending={spending} />;
        })}
      </div>
      <Alert open={alert} />
      <DialogMenu
        setOpen={setOpen}
        open={open}
        refetch={handleRefetch}
        users={middleCheck.data?.group?.users}
      />
    </AuthenticatedLayout>
  );
};

const Spending: FC<{ spending: Spending }> = ({ spending }) => {
  return (
    <div className="m-3 inline-flex w-[95%] items-center justify-between rounded-md border p-2   shadow-sm">
      <div className="block ">
        <div>{spending.name}</div>
        <div className="text-sm text-[#AAAA]">
          {spending.createdAt.toDateString()}
        </div>
        <div className=" inline-block ">{spending.amount}$</div>
      </div>
      <div className=" bomboclat relative inline-flex  ">
        <img
          className=" bomboclar h-8 w-8 rounded-full border shadow-sm"
          src="https://lh3.googleusercontent.com/a/AGNmyxaNi0TQYLM6FMj0cgRNczOAKWZykJPtp2X8Mrcuug=s96-c"
        />
        <img
          className=" bomboclar  h-8 w-8 rounded-full border shadow-sm"
          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAH4AtwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAGAQIDBAUABwj/xAA/EAACAQIEAwQIBAMGBwAAAAABAgMAEQQFEiExQVEGEyJhMnGBkaGxwdEUI1LwM0JiBxUlcuHxJENTc7LC0v/EABkBAAMBAQEAAAAAAAAAAAAAAAABAgMEBf/EACERAQEAAgICAgMBAAAAAAAAAAABAhEDMQRBEiEiMlET/9oADAMBAAIRAxEAPwAVyWLvMmmWyaQ5uTHc1Bi440wTMNNrgk7393CrPZlr5fiX1DwSOLl/KocUmjDTd2x1eUjED2Vh7dntdJu+RSKPRxNvAluKnma3mZvExGjxHYhKwiEOGykixti02BLcQRwoldWTWriT0uJiFFRRX2SYtkYBO4nbiR5HpRJgrNGQTwbl6qGeyJH91yjb+PzHktEWBJ0N6wfhWmLDLtoR+ZqTjUaU6qS7frSXPWlpKAikR+Tt76Uu1r3rnY9aanpi/OgEjdj6d6kkNqfN5ACopDegIMY1oL/1feqWCbxr/mq1jjbDDzb6GqeB3kUf1GpvYbK35112HA2pdq6/lVAwvIKdC7N6W9MkbVztUkJVeJFMKuIxMqTkR7WpySyTC8hvSSLediQKXDiyUgbiBcgdK6ll3ekoD557HyFsFi1F7iXY94Byq0yJJhMVcsSP5e8B+dU+xI1fjFTVxB8EYPLzrWxA/JlvGTY2/hqOXrrG9uu9mrqTKcES+pUxMZuXBPHoBRHJGWJdEUKV2IVifjWBFdsnRGDArPDfVGFA8Q5jf3URLcvpGh2C9XsPbSTRD2MLDAYpWYm0ykeHT++FE2BPgb2UMdkCe7xikAHUnAHz60TYH0H8rfWtMWGXa+hp96gjp0syxRF23t0q7dJTnwi7MBxqObEQwEiVtJC6je1gOprEzLOIo4MQ5dfCLgXG9+VAWZZ3mOYxzYYzhzJ4GK28I8/OufPm/jfj4Ll29Gw+fZbi8T+HjlGo+iw3Vuu9aUa+NenUV5PlGBmhdAsbFlAJddiSOFekZZiS+Gi0Pdl4htjT4+XfY5eL4dNWVfCT0qBxU5kDRm+xPKoJONq3YKWYm0CjzJqtlwvIp8yanzM2jQdb1Bl5sVNuRNTew1tdcGvUWquD2qiPNulIjbamUEUxX1UyTWosdhQRWKm9jxqWH0B51UiK6bk1diFkX1XoMwi8luFdTZm0RySerauoN85diWvjMWtr3APA7fGt+eHUs1kfSR6PdD/ehvsczJnEylQbrzB291EmIhEiSeBTfhqiZr+81je3ZezYLnKZSEW6vGWfRbgwPGiOGUS6GQ7AWbxt8gKGsIFXK8ToA0rYldLDa46+qiUTB4ktIwcL/wBU/G3GkjJvdlbd5ilBFigNhfr5+uibBcJR6vrQn2UP/GTbr44zwvYbjmaLsBEzd7p3/wBzWmLDPtaUqOdDfbnNZMtwcQjUkNsWJ4UQMNBsRQ320t+DVWQkSWAIG1+nlU81sw2vhn5yPOzmU2L75YVsGtrU248iKJux2LlxRxHfwCy28QX0j50J5fBOuZ4hYwy6gNCs1/fW3lmAzKSQGG0A1WZHZ9ZAtvcG2/0rnmM1t6OcnxHSBE4Kq73PK1ZWcTNAY54nK2k30tx8q7E4fEYvAoqylGN9bAXt7KzFynHnBCLENEZROCrxro1C3Ej13pXrcYzGex9lc5xWASdhpLgGxPCrEh8dZ/Z5r5Ph7A7qPS41fl9OuzD9duHOflpRzQ7RDyJqHA8vJRUma8UHRL03BDewtwAo9pXv5b1GSakNwm9NDBuAqkmhtB02uaa934/Onlbvfna965owvE/Gg1dkIFrVpoLADoLVDh2S9nF6QYuNWKyDSeQ43oORDmFzhio2u3Gup2KKSx2Rgd711I3zZ2ZkMOfMpsNQYeIlaLZYklWUAIzEXN1Y+7hQdk5EXaKwOnxMLqdPPyo1uWaQFgQQRYlz9Kyy7deXaphY0OVYwJsQhazOeW/OiXAtJHhowzblRctKCPcKHsKpOBx6s3CJttbHlRBl8wOHRY2Nwo37wfQUkVsdnCRmNy3pRsbamPzo1ytiplA/e5oJyBLZmhBfdW2IY8vOjbLtnl/fM1pgxz7W2hDtcn4UP9rsqxWNy544nHdBg2k3NyPVRKLngK7Vvcmryx+U0WN+NleCSh8vzh0k7wS6woWXiSBRtlOZmfDWbY+e1qtdvuzWZ5zjsLicGiyRwg3VNKvq4qdyNqF8PMkU8mDxShSbxsrHmDY1zWaj0sM5yYtvA46RJWimnwQ8RKkTAsb8BatjCxrj51V2dVVtQC8WsCN/fQpgcghTQsmIgfDo+sRgWJPK+9vhXoWRxRJhA11aRwdxxHlRJLdM/Isxn0uQRiFFRFCKotYU2Q3epFJPE3qBz466Ovp5+91RzQ+Nf+396ZEN7+rnalzPeQDogFWsujikVzJvc2pexejlLKtgffXGbrY1c7mCkOHw5qi0rJLqNyhG1qUyW4KKsjDw9T76X8NH+zQFRCxcabb1ns7FpRxCtYD2D71sGCONG0nlesePjMesh+Q+1KnEZIBupI8q6pNApak3ztgWMXakkEbSMNm8z5Ud6CzsDqJsT4SzfK1AU+qPtO2liPzmHE+fSj531hkLCTYA31NtUZOvJBl0AMeKVnY6kZbXfpW3lQ14NBu4KjgzE/AVkZYLyOo1GynYK+9xWxkgZ8rgNtYKjYhtqSK08ih05nGzBg1mFihtw63o1wLBXfUbX+9BGUw93mULkLubegNviTRfoeQER8T960wY59tKWVlYKvE1C+L/AA5/OcW5edQwpMCGkGojn5UGZri5p8zkszbtZUvVZZaXxcf+lF+aZ3h8Lls2IYsFVTfRuw9VeS5hjcJjsW82GmDo7FrsLbnjcUQ53iwsRwyvfazAcuZHy94of/uuB31AFCeNuBrO2PS8fgxwlT4KWKE3OtvMKTRPk3aGPL+8M9yJDsoHDYD5ChZMCkZ0q7W8tq0cJGkT7Djx5X9tT19xrnx45QdZZ2gweOdUjScM3WI7Vfk9P1caDMLiDA2qNivqrbw2cr4RiG1Dk3A1cz/rzubx9X8VjMj+eR0CirOXqSjaRfxVSzBw05ZDcMFIPurTygE4UkbXY/IVU+65LE2luldZv0mrFjTbHqapOkAU/panWboffUwU9TSEGgIDfumJPIisqLg56yN862JxaE8r1jwm8d/1MT7zSpw+kpTXUjfOWagRdp5eHhnPM9R0o9iXvUUgIRoFghYmgXtIO77SzlgB+f8AO1HMLNJBBdtXhFwodqiuvIuVx/nuJbMC3h0pJ8q0Mg8WWQhWudI8IDG3xHzqtgBad1WIhw3DuztVnIQYsMyK49NgPy/9bVKK2sDpjx0JOlbMN2UKfnRrgDaZ/MX+NAsJK4mJgFbxD9A5+W9HOCFpm/y1pgxzWsS+mBzwutvfXm2YYtYJsRi73dz+ULcKPM8m7rANfbYm/sNvjavLMdMZZiTuIxYHzozdvhY7lpmomSxN7+kTzPE1ZRgoJPKqMJ/OqSR+CjlWdelr0tJyY8+VTA+K9Qp6C1INqCsXiRo1VE097LfYVE8mmGqQlJf2XpImAuy2Yy4Uat2Q6b+XKivKbDBjzY0D5BJqOj9XH9++jnLBpwaeZJ+Na4PJ8jGY52RcNJtSE029abc54tXbUwXrt6Aix20O1YsH8GPzF/rWrmTaYTfkCaHMkzSDMomSIMs0FhJGRw5A36VNv2emia6lcWF/nSUg+d+2Xg7ST6dvGDRnliJJhI2KnvHUXYxsR8TQd27Fs/mHXSb+yjDI2L5ZDsoXSLHu2+9qi9Oy9L0EUhnMYJQk31CK9vjapcoVdUz93cpJINYC72Y871UjkSGX8uNpF6rEv3pcnYd9jC0mlTNIAL8PEeHhqWdbgnhaQIJTe4Ozjb3CvQcH/Ga36ftXnYkYSoL6hta2q9ehZYbvq46owflV4MuRj9usYuHy4ITZn8I9+/8A4/GvONYk52FFH9qMoM+Es3iDMAOoAX60FpKykqwsRTs9vW8PDXFKtIwWS9cr3N787VXViy2Xfa9RiWy3/qNLTrbkR1IPKpv5b1QgmFgOtWu8BAA4HnUaTYWVvy7VTB/NA6rtWnlyLNikVxdA9yPKs3M1/DY0LwsxA9u4pxMv3ptZBIVkBG4Av9/nXpGX7YOL1E/GvL+zsg/FQK3os2g+2vUsJZcMicSBY++rxeb52OstpaS/lS3rtqtwOrlpbUg2oDMz59GAxDdIz8jQx2KiCJj5bfxJEXfoLn6iiHtSdOVzH9akercCsfs6Bhsklmbg0jvfyAA+lRf2XP1oPwH9p2HhzXHYTPY+7ijnkWDERJfwhjZWXjfbjXV5HipWkklmv/FlZuVdQ3/yx/gg7dj/ABh26oprf7KusmUxq92uu/gUj51h9ulvjkPWJSf37av9lJ2jy+M93GUAtuN/lU3pd62JVCxzemqg8BZF+dMykt3uLdFZgk8mk+I/zH70uHJkYNF4NfAAKP8A1rKyaaSLMswRzqYYl23sQTrPMi9SkRKyM+qYsLWsJAPqa9IySQP3dt7wqfgK8siDJM4cceOlh/8ANei5M7RYUvYXiw5vY8bKPtVYVlnAD/aDijiM2Uj0VNhv1ufrWHcOWYjerfaRy8veHj3p+tU7aULcb3q/T2+KfHCRNBZbW5i1VgoKNt6LVYh3YDpUCC/er/VUtEuHc7eVOwU7/iWRm8N7VFCNNQwvbGNb9VPShVk7Az2G5It6qp9pwb99bfwfK1dlsvdYrvRfUrah66nz3TiMulkA0+EN7qJGGtZ7U8skMbqw/lIPtr1zKZ1xGDSVDe62PrtXjmCayg+QNH/YzGyiUYZj+WUb3g/Y0dVzebx7x3BfXb1x2qOSZE9IH2VW3kJb0uoVTbHxL/K/uH3qBs3gH/Lk+FGwp9sX/wAMI6m3xB+lDuYYt8v7M9yG0M+FkZQRxuGIrU7T4sYnBIVUqBJp38gT9awM4x2CzDJ8WqYWRZsPl72cvsbJbhUXtpOnhUY1mNL7WJ4V1bWU5OZ8PFjxIoOor3ZG1tPG9LTdXyj/2Q=="
        />
        <img
          className="bomboclar h-8 w-8 rounded-full border shadow-sm"
          src="https://media-cldnry.s-nbcnews.com/image/upload/newscms/2016_22/1564496/ali-liston.jpg"
        />
      </div>
    </div>
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
