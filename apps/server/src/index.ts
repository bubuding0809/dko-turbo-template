import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { trpcServer } from "@hono/trpc-server";
import { appRouter, createTRPCContext } from "@dko/trpc";
import { env } from "hono/adapter";
import dotenv from "dotenv";

dotenv.config()

const app = new Hono();

app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
    createContext: createTRPCContext,
  })
);

app.get("/", (c) => {
  return c.json({ message: "Hello world" });
});

app.get("/env", (c) => {
  // NAME is process.env.NAME on Node.js or Bun
  // NAME is the value written in `wrangler.toml` on Cloudflare
  const envVars = env(c, "bun");
  return c.json(envVars);
});

serve(
  {
    fetch: app.fetch,
    port: parseInt(process.env.PORT || "8080"),
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
