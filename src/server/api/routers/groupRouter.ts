import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const groupRouter = createTRPCRouter({
  add: publicProcedure.mutation(async ({ input, ctx }) => {
    // await ctx.prisma.spendingGroup.create({
    //   data: {
    //     name: "Poyraz's Group",
    //     users: ["64027bcffa8b812aec8e552b"],
    //   },
    // });

    ctx.prisma.spending
      .create({
        data: {
          name: "Poyraz's Group",
          users: [
            {
              userId: "64027bcffa8b812aec8e552b",
              name: "Poyraz",
              image:
                "https://www.indiewire.com/wp-content/uploads/2022/02/Ana-de-Armas.jpg",
            },
          ],
          spendingGroupID: "64028482c32f2ac4724d5f64",
          amount: 25,
        },
      })
      .then(() => {
        console.log("finito");
        return {
          data: "allSpendings",
        };
      });
    // const allSpendings = await ctx.prisma.spending.findMany({
    //   where: {
    //     spendingGroupID: "64028482c32f2ac4724d5f64",
    //   },
    // });
  }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    const userID = ctx.session?.user.id;
    if (!userID) {
      return {
        error: "Not auth",
      };
    }
    const data = await ctx.prisma.spendingGroup.findMany({
      where: {
        users: {
          has: userID,
        },
      },
    });

    return {
      data,
    };
  }),

  check: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const len = input.length;
    if (len < 24 || len > 24) {
      return {
        error: "Too short",
      };
    }
    const data = ctx.session?.user.id;
    if (!data) {
      return {
        error: "Not authenticated!",
      };
    }

    const groupData = await ctx.prisma.spendingGroup.findFirst({
      where: {
        id: input,
      },
    });

    if (!groupData) {
      return {
        error: "Group Not Found",
      };
    }

    const isInGroup = groupData?.users.includes(data);

    if (!isInGroup) {
      return {
        error: "Person not in group",
      };
    }

    // everything is fine return all spendings.
    const allSpendings = await ctx.prisma.spending.findMany({
      where: {
        spendingGroupID: groupData.id,
      },
    });
    return {
      data: allSpendings,
    };
  }),
});
