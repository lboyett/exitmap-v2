import express from "express";
import bodyParser from "body-parser";
import indexRouter from "./routes/index";

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`Now listening on port: ${port}`);
});
