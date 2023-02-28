import express, { Express, Request, Response } from "express";
const port = 8000;

const app = express();

app.get("/", (req, res) => {
  res.send("hello world + this is a test");
});

app.listen(port, () => {
  console.log(`Now listening on port: ${port}`);
});
