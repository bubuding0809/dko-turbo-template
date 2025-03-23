import { Hono } from "hono";
import { cors } from "hono/cors";
import { trpcServer } from "@hono/trpc-server";
import { appRouter, createTRPCContext } from "@dko/trpc";
import dotenv from "dotenv";

dotenv.config();

const app = new Hono();

app.use(cors());

//* Route all TRPC requests to the TRPC middleware
app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
    createContext: createTRPCContext,
  })
);

//* Render TRPC panel in development for testing of TRPC APIs
app.use("/panel", async (c) => {
  const { renderTrpcPanel } =
    process.env.NODE_ENV === "development" ? await import("trpc-ui") : {};

  if (!renderTrpcPanel)
    return c.json({ message: "TRPC panel not found in this environment" }, 404);

  return c.html(
    renderTrpcPanel(appRouter, {
      url: "/trpc",
      meta: {
        title: "DKO TRPC API",
        description: "🚀Test your TRPC APIs here 🚀",
      },
    })
  );
});

app.get("/ping", (c) => {
  return c.text("pong");
});

export default app;
