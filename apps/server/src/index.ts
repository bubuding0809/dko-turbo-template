import { serve } from "@hono/node-server";
import app from "./app.js";

const PORT = parseInt(process.env.PORT || "8080");

serve(
  {
    fetch: app.fetch,
    port: PORT,
  },
  () => {
    console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
    console.log(`🚀 Server running on ${PORT}`);
  }
);
