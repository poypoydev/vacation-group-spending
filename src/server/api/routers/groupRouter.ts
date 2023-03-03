import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const groupRouter = createTRPCRouter({
  add: publicProcedure.mutation(async ({ input, ctx }) => {
    await ctx.prisma.spendingGroup.create({
      data: {
        name: "Poyraz's Group",
        users: ["64027bcffa8b812aec8e552b"],
      },
    });
    return {
      ok: `yes`,
    };
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

    return data;
  }),
  check: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const len = input.length;
    if (len < 24) {
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

    return {
      greeting: `Hello ${ctx.session?.user.name}`,
    };
  }),
});
