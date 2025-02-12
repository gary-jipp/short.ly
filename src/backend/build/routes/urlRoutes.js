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
exports.default = default_1;
const express_1 = __importDefault(require("express"));
const crypto_1 = __importDefault(require("crypto"));
const urls_1 = __importDefault(require("../database/urls"));
const router = express_1.default.Router();
const generateShortUrl = function (size) {
    return crypto_1.default.randomBytes(3).toString('hex').toUpperCase().slice(0, size); // pretty unique
};
function default_1(pool) {
    const { getUrls, getUrl, addUrl, updateUrl, deleteUrl } = (0, urls_1.default)(pool);
    router.post("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const longUrl = req.body.longUrl; //
        const shortUrl = generateShortUrl(6);
        try {
            const row = yield addUrl(shortUrl, longUrl);
            res.json(row);
        }
        catch (error) {
            console.log(error);
            res.json(error);
        }
    }));
    router.get("/", (_, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const rows = yield getUrls();
            res.json(rows);
        }
        catch (error) {
            console.log(error);
            res.json(error);
        }
    }));
    return router;
}
;
