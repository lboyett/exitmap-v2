"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const AWS = __importStar(require("@aws-sdk/client-s3"));
const uniqid_1 = __importDefault(require("uniqid"));
const path_1 = __importDefault(require("path"));
const exitController_1 = require("../controllers/exitController");
const imageController_1 = require("../controllers/imageController");
const commentController_1 = require("../controllers/commentController");
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
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
        console.log(exitImages);
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
// router.post("/users", async (req, res, next) => {
//   const user_data = req.body.headers;
//   try {
//     const response = await addUser(user_data);
//     console.log(response);
//     res.send("OK");
//   } catch (err) {
//     console.log(err);
//     res.status(500).send(err);
//   }
// });
router.post("/login", (req, res, next) => {
    console.log("You just posted to the /login route");
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
//-------- IMAGES ----------------------
const s3 = new AWS.S3Client({
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
router.post("/images", uploadFile, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const exit = req.body.exit;
    const submitted_by = req.body.submitted_by;
    const url = req.file.location;
    const key = req.file.key;
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
exports.default = router;
