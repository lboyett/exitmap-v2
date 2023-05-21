"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const index_1 = __importDefault(require("./routes/index"));
const utilities_1 = __importDefault(require("./routes/utilities"));
const login_1 = __importDefault(require("./routes/login"));
const logout_1 = __importDefault(require("./routes/logout"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 8000;
const corsOptions = {
    credentials: true,
    origin: "*",
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
app.use((0, morgan_1.default)("dev"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.use((0, express_session_1.default)({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
}));
app.use((0, connect_flash_1.default)());
app.use("/login", login_1.default);
app.use("/logout", logout_1.default);
app.use("/", index_1.default);
app.use("/utilities", utilities_1.default);
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
