"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dbConfig_1 = __importDefault(require("./config/dbConfig"));
const urlRoutes_1 = __importDefault(require("./routes/urlRoutes"));
const app = (0, express_1.default)(); // Type is inferred
const port = Number(process.env.API_PORT || 8000);
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
// Use an Express Router for modularity
app.use('/api/urls', (0, urlRoutes_1.default)(dbConfig_1.default));
// Health check
app.get("/api/health", (_, res) => {
    res.json({ "status": "healthy" });
});
app.use((req, res) => {
    res.status(404).json({ error: "Not Found" });
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
