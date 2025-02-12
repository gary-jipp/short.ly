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
const urlQueries_1 = __importDefault(require("../database/urlQueries"));
const generateShortUrlId = function (size) {
    // Generate a pretty unique url ID
    return crypto_1.default.randomBytes(3).toString('hex').toUpperCase().slice(0, size).toLowerCase();
};
const getBaseUrl = function (req) {
    return `${req.protocol}://${req.get('host')}/`;
};
// Get Express Router to use for endpoints
const router = express_1.default.Router();
function default_1(pool) {
    const { getUrls, getUrl, addUrl, updateUrl, deleteUrl } = (0, urlQueries_1.default)(pool);
    router.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const baseUrl = getBaseUrl(req);
        try {
            const rows = yield getUrls(baseUrl);
            res.json(rows);
        }
        catch (error) {
            console.log(error);
            res.json(error);
        }
    }));
    const UrlIdLength = Number(process.env.URL_ID_LENGTH);
    console.log("URL_ID_LENGTH =", UrlIdLength);
    router.post("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const longUrl = req.body.longUrl;
        let UrlId;
        do {
            UrlId = generateShortUrlId(UrlIdLength);
            console.log("urlId", UrlId);
        } while (yield getUrl(UrlId));
        console.log("Add Record");
        try {
            const row = yield addUrl(UrlId, longUrl);
            res.json(row);
        }
        catch (error) {
            console.log(error);
            res.json(error);
        }
    }));
    router.put("/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        const longUrl = req.body.longUrl;
        try {
            const row = yield updateUrl(id, longUrl);
            res.json(row);
        }
        catch (error) {
            console.log(error);
            res.json(error);
        }
    }));
    router.delete("/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        try {
            const row = yield deleteUrl(id);
            res.json(row);
        }
        catch (error) {
            console.log(error);
            res.json(error);
        }
    }));
    return router;
}
;
