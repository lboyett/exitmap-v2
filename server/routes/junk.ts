// router.post("/", (req, res, next) => {
//   passport.authenticate(
//     "local",
//     { session: false, failureFlash: true },
//     (err: any, user: any, info: any) => {
//       if (err || !user) {
//         return res.status(400).json({
//           message: "there is an error",
//           user: user,
//         });
//       }
//       req.login(user, { session: false }, (err) => {
//         if (err) {
//           res.send(err);
//         }
//         const token = jwt.sign(
//           { user: user },
//           process.env.ACCESS_TOKEN_SECRET as string,
//           { expiresIn: "1m" }
//         );
//         return res
//           .status(200)
//           .setHeader("Access-Control-Allow-Methods", "GET, POST")
//           .setHeader("Access-Control-Allow-Headers", "Content-Type, *")
//           .cookie("token", token, {
//             httpOnly: true,
//             sameSite: "none", //FixThis
//             secure: true,
//             maxAge: 10000000,
//             signed: true,
//           })
//           .send("works");
//       });
//       next();
//     }
//   )(req, res, next);
// });

// router.post(
//   "/",
//   (req, res, next) => {
//     console.log(req.body);
//     next();
//   },
//   passport.authenticate("local", {
//     session: false,
//     failureFlash: true,
//     failureRedirect: "/login/error",
//   }),
//   (req, res) => {
//     const token = jwt.sign(
//       { user: req.user },
//       process.env.ACCESS_TOKEN_SECRET as string,
//       { expiresIn: 100000 }
//     );
//     res
//       .status(200)
//       .setHeader("Access-Control-Allow-Methods", "GET, POST")
//       .setHeader("Access-Control-Allow-Headers", "Content-Type, *")
//       .cookie("token", token, {
//         httpOnly: true,
//         sameSite: "none", //FixThis
//         secure: true,
//         maxAge: 10000000,
//         signed: true,
//       })
//       .send("works");
//   }
// );

// router.get("/error", (req, res) => {
//   console.log(req.sessionStore);
//   console.log(req.flash("error"));
//   res.status(400).send("problem");
// });

// router.get("/cookie", (req, res) => {
//   res
//     .status(200)
//     .setHeader("Access-Control-Allow-Methods", "GET, POST")
//     .setHeader("Access-Control-Allow-Headers", "Content-Type, *")
//     .cookie(
//       "token",
//       jwt.sign({ payload: 1234 }, process.env.ACCESS_TOKEN_SECRET as string, {
//         expiresIn: "10m",
//       }),
//       {
//         httpOnly: true,
//         sameSite: "none", //FixThis
//         secure: true,
//         maxAge: 10000000,
//         signed: true,
//       }
//     )
//     .send("cookie sent");
// });

// router.get("/log-cookie", (req, res) => {
//   console.log(req.signedCookies.token);
//   res.send("server received cookie");
// });
// router.post("/log-cookie", (req, res) => {
//   console.log(req.signedCookies.token);
//   console.log("request received");
//   res.send("server received cookie");
// });

//===============SERVER===================

// app.use(passport.authenticate("session"));

// Authentication session

// passport.use(
//     new LocalStrategy(function verify(email, password, cb) {
//       pool.query(
//         "SELECT * FROM users WHERE email = $1",
//         [email],
//         function (err, user) {
//           if (err) {
//             return cb(err);
//           }
//           if (!user || !user.rows[0]) {
//             // For some reason, passport will continue with authentication with an undefined user, so I had to add in the second guard clause of !user.rows[0]
//             return cb(null, false, {
//               message: "Email not found.",
//             });
//           }

//           crypto.pbkdf2(
//             password,
//             user.rows[0].salt,
//             310000,
//             32,
//             "sha256",
//             (err, hashedPassword) => {
//               if (err) {
//                 return cb(err);
//               }
//               if (
//                 !crypto.timingSafeEqual(
//                   user.rows[0].hashed_password,
//                   hashedPassword
//                 )
//               ) {
//                 return cb(null, false, {
//                   message: "Incorrect email or password.",
//                 });
//               }
//               return cb(null, user.rows[0]);
//             }
//           );
//         }
//       );
//     })
//   );

//   passport.serializeUser((user: any, cb) => {
//     process.nextTick(() => {
//       cb(null, { id: user.id, email: user.email });
//     });
//   });

//   passport.deserializeUser((user: any, cb) => {
//     process.nextTick(() => {
//       return cb(null, user);
//     });
//   });
