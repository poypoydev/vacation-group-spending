import { string, z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const groupRouter = createTRPCRouter({
  add: publicProcedure
    .input(
      z.object({
        name: z.string(),
        amount: z.number(),
        groupId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      ctx.prisma.spending
        .create({
          data: {
            name: input.name,
            users: [
              {
                userId: "64027bcffa8b812aec8e552b",
                name: "Poyraz",
                image:
                  "https://www.indiewire.com/wp-content/uploads/2022/02/Ana-de-Armas.jpg",
              },
            ],
            spendingGroupID: input.groupId,
            amount: input.amount,
            createdAt: new Date(),
          },
        })
        .then(() => {
          console.log("finito");
          return {
            data: "allSpendings",
          };
        });
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    const userID = ctx.session?.user.id;
    if (!userID) {
      return {
        error: "Not auth",
      };
    }

    /*

    await.ctx.pri


    */

    const data = await ctx.prisma.spendingGroup.findMany({
      where: {
        userIDs: {
          has: userID,
        },
      },
    });
    console.log(userID);
    return {
      data,
    };
  }),
  createGroup: publicProcedure.mutation(async ({ ctx }) => {
    const userID = ctx.session?.user.id;
    if (!userID) {
      return {
        error: "Not auth",
      };
    }
    const newGroup = await ctx.prisma.spendingGroup.create({
      data: {
        name: "Poyraz GurA",
        groupImage:
          "https://media.cntraveler.com/photos/60e612ae0a709e97d73d9c60/1:1/w_3840,h_3840,c_limit/Beach%20Vacation%20Packing%20List-2021_GettyImages-1030311160.jpg",
        users: [
          {
            userId: "64027bcffa8b812aec8e552b",
            name: "Poyraz",
            image:
              "https://www.indiewire.com/wp-content/uploads/2022/02/Ana-de-Armas.jpg",
          },
        ],
        userIDs: [userID],
      },
    });

    return { newGroup };
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

    const isInGroup = groupData?.userIDs.includes(data);

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
      group: groupData,
    };
  }),
});
