import express, { Router } from "express";
import { appRouter, createTRPCContext, trpcExpress } from "@dko/trpc";

const app = express();
const router = Router();

//* Route all TRPC requests to the TRPC middleware
router.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: createTRPCContext,
  })
);

//* Add TRPC panel for testing APIs in development
router.use("/panel", async (_req, res) => {
  const { renderTrpcPanel = null } = await import("trpc-ui");

  if (!renderTrpcPanel) {
    res
      .status(404)
      .json({ message: "TRPC panel not found in this environment" });
    return;
  }

  // Only render the panel in development
  res.send(
    renderTrpcPanel(appRouter, {
      url: "/api/trpc",
      meta: {
        title: "DKO TRPC API",
        description: "🚀Test your TRPC APIs here 🚀",
      },
    })
  );
});

app.use("/api", router);

app.get("/", (_req, res) => {
  res.status(200).json({ message: "Hello from DKO TRPC API" });
});

export default app;
