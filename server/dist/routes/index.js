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
const testController = __importStar(require("../controllers/testController"));
const exitController_1 = require("../controllers/exitController");
const imageController_1 = require("../controllers/imageController");
const router = express_1.default.Router();
router.get("/exits/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exitData = yield (0, exitController_1.getExit)(req.params.id);
        const exitImages = yield (0, imageController_1.getExitImages)(req.params.id);
        res.json([exitImages, exitData]);
    }
    catch (err) {
        res.status(500).send("Internal server error in the getExit request");
    }
}));
router.post("/exits", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const exit_data = req.body.headers.exit_data;
    try {
        // const response = await addExit(exit_data);
        // console.log(response);
        console.log(exit_data);
    }
    catch (err) {
        console.log(err);
    }
}));
router.get("/test", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exits = yield testController.getExits();
        res.send(yield exits);
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
exports.default = router;
