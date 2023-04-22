import path from "path";

import express from "express";

const app = express();

// * serve public files on root
const publicDir = path.resolve("public");
app.use(express.static(publicDir));
app.get("/*", (req, res) => {
  const index = `${publicDir}/index.html`;
  res.sendFile(index);
});

export default app;
