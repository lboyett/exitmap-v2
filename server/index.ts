import express, { Express, Request, Response } from "express";
const port = 8000;

const app = express();
var indexRouter = require('./routes/index');

app.listen(port, () => {
  console.log(`Now listening on port: ${port}`);
});

app.use('/', indexRouter)
