import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import indexRouter from "./routes/index";
import utilitiesRouter from "./routes/utilities";
import logger from "morgan";
import cors from "cors";
import pool from "./pool-config";
import session from "express-session";
import path from "path";

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
app.use(express.static(path.join(__dirname, "../public")));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.authenticate("session"));

app.use("/", indexRouter);
app.use("/utilities", utilitiesRouter);

// Authentication session

passport.use(
  new LocalStrategy(function verify(username, password, cb) {
    pool.query(
      "SELECT * FROM users WHERE email = $1",
      [username],
      function (err, user) {
        if (err) {
          return cb(err);
        }
        if (!user || !user.rows[0]) {
          // For some reason, passport will continue with authentication with an undefined user, so I had to add in the second guard clause of !user.rows[0]
          return cb(null, false, {
            message: "Incorrect email or password.",
          });
        }

        crypto.pbkdf2(
          password,
          user.rows[0].salt,
          310000,
          32,
          "sha256",
          function (err, hashedPassword) {
            if (err) {
              return cb(err);
            }
            if (
              !crypto.timingSafeEqual(
                user.rows[0].hashed_password,
                hashedPassword
              )
            ) {
              return cb(null, false, {
                message: "Incorrect username or password.",
              });
            }
            return cb(null, user);
          }
        );
      }
    );
  })
);

passport.serializeUser(function (user: any, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function (user: any, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

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
