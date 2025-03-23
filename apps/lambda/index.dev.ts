import app from "./api";

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log("NODE_ENV:", process.env.NODE_ENV);
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
