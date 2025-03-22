import { helloRouter } from "./routers/hello.js";
import { createTRPCRouter } from "./trpc.js";

export const appRouter = createTRPCRouter({
  hello: helloRouter,
});

export type AppRouter = typeof appRouter;
