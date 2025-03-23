import express, { Router } from "express";
import { prisma } from "@dko/database";

const app = express();

const router = Router();

router.get("/", (_req, res) => {
  res.send("Hello World");
});

router.get("/user", async (_req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});

app.use("/api", router);

export default app;
