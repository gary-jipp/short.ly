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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
function default_1(pool) {
    const getUrls = () => __awaiter(this, void 0, void 0, function* () {
        const sql = "SELECT id, short_url AS shortUrl, long_url AS longUrl,  usage_count as usageCount, created FROM urls";
        const res = yield pool.query(sql);
        return res.rows;
    });
    const getUrl = (shortUrl) => __awaiter(this, void 0, void 0, function* () {
        const sql = "SELECT id, short_url AS shortUrl, long_url AS longUrl, created FROM urls WHERE short_url=$1";
        const res = yield pool.query(sql, [shortUrl]);
        return res.rows[0];
    });
    const addUrl = (shortUrl, longUrl) => __awaiter(this, void 0, void 0, function* () {
        const sql = 'insert into urls (short_url, long_url) values ($1,$2) returning *';
        const res = yield pool.query(sql, [shortUrl, longUrl]);
        return res.rows[0];
    });
    const updateUrl = (id, longUrl) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const sql = 'update urls set long_url=$1 where id=$2';
        const res = yield pool.query(sql, [longUrl, id]);
        return (_a = res.rowCount) !== null && _a !== void 0 ? _a : 0; // return rows updated
    });
    const deleteUrl = (id) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const sql = 'delete from urls where id=$1';
        const res = yield pool.query(sql, [id]);
        return (_a = res.rowCount) !== null && _a !== void 0 ? _a : 0; // return rows updated
    });
    return { getUrls, getUrl, addUrl, updateUrl, deleteUrl };
}
;
