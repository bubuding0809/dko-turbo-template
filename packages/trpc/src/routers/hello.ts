import { publicProcedure } from "../trpc.js";

export const helloRouter = {
  helloWorld: publicProcedure.query(() => {
    return {
      greeting: `Hello World!`,
    };
  }),
  users: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.user.findMany();
    return users;
  }),
};
