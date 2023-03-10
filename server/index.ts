import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import indexRouter from "./routes/index";
import utilitiesRouter from "./routes/utilities";
import logger from "morgan";
import cors from "cors";
import pool from "./pool-config";

// Authentication dependencies
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import crypto from "crypto";

const app = express();
const port = 8000;

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", indexRouter);
app.use("/utilities", utilitiesRouter);

// Authentication session

app.use((req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.status(404).send("<div>404: Not Found</div>");
    return;
  }
  if (req.accepts("json")) {
    res.status(404).send({ error: "Not Found" });
    return;
  }
  res.type("txt").send("Not found");
});

app.listen(port, () => {
  console.log(`Now listening on port: ${port}`);
});
