import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import cors from "cors";
import session from "express-session";
import path from "path";
import cookieParser from "cookie-parser";
import flash from "connect-flash";

import indexRouter from "./routes/index";
import utilitiesRouter from "./routes/utilities";
import loginRouter from "./routes/login";
import logoutRouter from "./routes/logout";
import forgotPasswordRouter from "./routes/forgot-password"

const app = express();
const port = 8000;
const corsOptions = {
  credentials: true,
  origin: "http://localhost:5174",
};

app.use(cors(corsOptions));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/forgot-password", forgotPasswordRouter)
app.use("/", indexRouter);
app.use("/utilities", utilitiesRouter);

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
