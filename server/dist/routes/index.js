"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const client_s3_1 = require("@aws-sdk/client-s3");
const client_s3_2 = require("@aws-sdk/client-s3");
const uniqid_1 = __importDefault(require("uniqid"));
const path_1 = __importDefault(require("path"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const exitController_1 = require("../controllers/exitController");
const imageController_1 = require("../controllers/imageController");
const commentController_1 = require("../controllers/commentController");
const userController_1 = require("../controllers/userController");
const authorizeUser_1 = __importDefault(require("../utils/authorizeUser"));
const router = express_1.default.Router();
function authenticateToken(req, res, next) {
    const token = req.signedCookies.token
        ? req.signedCookies.token
        : req.cookies.token;
    if (token == null)
        return res.sendStatus(401);
    jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
        if (err) {
            console.log("theres an error");
            console.log(err);
            return res.status(403).send("authentication failure");
        }
        next();
    });
}
router.get("/test-authorization", authorizeUser_1.default, (req, res) => {
    res.send("ok");
});
// =========================== Exits ===========================
router.get("/exits/reviewed", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, exitController_1.getReviewedExits)();
        res.send(response);
    }
    catch (err) {
        res.status(500).send("error");
    }
}));
router.get("/exits/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let results = {};
        const exitData = yield (0, exitController_1.getExit)(req.params.id);
        aggregate("data", exitData);
        const exitImages = yield (0, imageController_1.getExitImages)(req.params.id);
        aggregate("images", exitImages);
        const exitComments = yield (0, commentController_1.getExitComments)(req.params.id);
        aggregate("comments", exitComments);
        function aggregate(name, data) {
            results[name] = data;
            if (results.data && results.images && results.comments) {
                res.json(results);
            }
        }
    }
    catch (err) {
        res.status(500).send("Internal server error in the getExit request");
    }
}));
router.post("/exits", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const exit_data = req.body;
    try {
        const response = (yield (0, exitController_1.addExit)(exit_data));
        res.status(200).send(response); //FixThis
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
router.delete("/exits/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = (yield (0, exitController_1.deleteExit)(+req.params.id));
        if (response === 0)
            throw new Error("Delete failed");
        res.status(200).send(response.toString()); //FixThis
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
}));
router.get("/exits/by-user-id/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.params.id;
    try {
        const exits = (yield (0, exitController_1.getExitsByUser)(user_id));
        res.send(exits);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}));
//================== USERS AND AUTHENTICATION ==========================
router.post("/logout", function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});
router.post("/populate-test-users", authenticateToken, (req, res, next) => {
    (0, userController_1.populateTestUsers)();
});
router.post("/users", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user_data = req.body.headers;
    try {
        const response = yield (0, userController_1.addUser)(user_data);
        res.send("OK");
    }
    catch (err) {
        res.send(err);
    }
}));
router.get("/users/current", authorizeUser_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, userController_1.getUserById)(res.locals.toString());
        res.status(200).send(user);
    }
    catch (err) {
        res.status(500).send("internal server error");
    }
}));
//=========================== IMAGES ===========================
const s3 = new client_s3_1.S3Client({
    apiVersion: "2006-03-01",
    region: "eu-central-1",
});
const bucketName = "lboyett-exitmap-v2";
const upload = (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3: s3,
        bucket: bucketName,
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.filename });
        },
        key: (req, file, cb) => {
            const ext = path_1.default.extname(file.originalname);
            cb(null, `${Date.now()}-${(0, uniqid_1.default)()}${ext}`);
        },
    }),
}).single("image");
function uploadFile(req, res, next) {
    upload(req, res, (err) => {
        if (err instanceof multer_1.default.MulterError) {
            console.log(err);
            res.status(500).send("A multer error occured during upload");
        }
        else if (err) {
            console.log(err);
            res.status(500).send("An unknown error occured during upload");
        }
        else {
            next();
        }
    });
}
router.get("/signed-url", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const key = `${Date.now()}-${(0, uniqid_1.default)()}`;
    const s3 = new client_s3_1.S3Client({
        apiVersion: "2006-03-01",
        region: "eu-central-1",
    });
    const command = new client_s3_2.PutObjectCommand({
        Bucket: "lboyett-exitmap-v2",
        Key: key,
    });
    try {
        const url = yield (0, s3_request_presigner_1.getSignedUrl)(s3, command, {
            expiresIn: 30,
        });
        res.send({ signedUrl: url, key: key });
    }
    catch (err) {
        console.log(err);
    }
}));
router.post("/images", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { submitted_by, exit, url, key } = req.body;
    try {
        const response = (yield (0, imageController_1.addImage)(submitted_by, exit, url, key));
        res.status(200).send(response.rows[0]);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
router.get("/images/:exit_id/main", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, imageController_1.getMainImageData)(req.params.exit_id);
        res.status(200).send(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}));
//============================COMMENTS============================
router.post("/comments", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, commentController_1.addComment)(req.body.comment, req.body.author_id, req.body.exit_id);
        res.status(200).send(response);
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
router.get("/comments/by-user-id/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.params.id;
    try {
        const comments = (yield (0, commentController_1.getCommentsByUser)(user_id));
        res.send(comments);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}));
exports.default = router;
