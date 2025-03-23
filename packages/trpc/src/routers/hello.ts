import { z } from "zod";
import { publicProcedure } from "../trpc.js";

export const helloRouter = {
  helloWorld: publicProcedure.query(() => {
    return {
      greeting: `Hello World!`,
    };
  }),
  user: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: input.id },
      });
      return user;
    }),
  users: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.user.findMany();
    return users;
  }),
};
