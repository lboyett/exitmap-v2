"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const exits_1 = __importDefault(require("./exits"));
const images_1 = __importDefault(require("./images"));
const comments_1 = __importDefault(require("./comments"));
const users_1 = __importDefault(require("./users"));
const forgot_password_1 = __importDefault(require("./forgot-password"));
const reset_password_1 = __importDefault(require("./reset-password"));
const router = express_1.default.Router();
// =========================== ROUTES ===========================
router.get("/test-server", (req, res) => {
    res.status(200).send("Server is up and running!");
});
router.use("/exits", exits_1.default);
router.use("/images", images_1.default);
router.use("/comments", comments_1.default);
router.use("/users", users_1.default);
router.use("/forgot-password", forgot_password_1.default);
router.use("/reset-password", reset_password_1.default);
exports.default = router;
