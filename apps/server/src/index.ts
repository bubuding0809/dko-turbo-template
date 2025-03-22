import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { prisma } from "@dko/database";

const app = new Hono();

app.get("/", (c) => {
  return c.json({ message: "Hello world" });
});

app.get("/user", async (c) => {
  const users = await prisma.user.findMany();
  return c.json(users);
});

app.get("/user/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return c.json(user);
});

serve(
  {
    fetch: app.fetch,
    port: 8000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
