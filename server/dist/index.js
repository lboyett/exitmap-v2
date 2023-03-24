"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const index_1 = __importDefault(require("./routes/index"));
const utilities_1 = __importDefault(require("./routes/utilities"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const pool_config_1 = __importDefault(require("./pool-config"));
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path"));
// Authentication dependencies
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const crypto_1 = __importDefault(require("crypto"));
const app = (0, express_1.default)();
const port = 8000;
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use((0, express_session_1.default)({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport_1.default.authenticate('session'));
app.use("/", index_1.default);
app.use("/utilities", utilities_1.default);
// Authentication session
passport_1.default.use(new passport_local_1.Strategy(function verify(username, password, cb) {
    console.log('LOCAL STRAT IS BEING CALLED');
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    pool_config_1.default.query('SELECT * FROM users WHERE email = $1', [username], function (err, user) {
        if (err) {
            return cb(err);
        }
        if (!user) {
            return cb(null, false, { message: 'Incorrect username or password.' });
        }
        console.log(user.rows[0]);
        crypto_1.default.pbkdf2(password, user.rows[0].salt, 310000, 32, 'sha256', function (err, hashedPassword) {
            if (err) {
                return cb(err);
            }
            if (!crypto_1.default.timingSafeEqual(user.rows[0].hashed_password, hashedPassword)) {
                return cb(null, false, { message: 'Incorrect username or password.' });
            }
            return cb(null, user);
        });
    });
}));
passport_1.default.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { id: user.id, username: user.username });
    });
});
passport_1.default.deserializeUser(function (user, cb) {
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
