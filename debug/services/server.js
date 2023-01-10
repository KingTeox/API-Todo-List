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
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const database_1 = __importDefault(require("./database"));
const index_1 = __importDefault(require("../routers/index"));
class server {
    constructor() {
        this.app = (0, express_1.default)();
        this.routers = new index_1.default();
        this.db = new database_1.default();
        this.httpsConfig = { key: fs_1.default.readFileSync(path_1.default.join(__dirname, "../../certs/key.pem"), "utf-8"), cert: fs_1.default.readFileSync(path_1.default.join(__dirname, "../../certs/cert.pem"), "utf-8") };
    }
    ;
    protection() {
        return __awaiter(this, void 0, void 0, function* () {
            // coming soon
        });
    }
    ;
    listeners() {
        return __awaiter(this, void 0, void 0, function* () {
            process.on("rejectionHandled", (promise) => {
                console.log(`[Teox] <rejectionHandled> ${promise}`);
            });
            process.on("uncaughtException", (error, origin) => {
                console.log(`[Teox] <uncaughtException> ${error}`);
            });
            process.on("unhandledRejection", (reason, promise) => {
                console.log(`[Teox] <unhandledRejection> ${reason} - ${promise}`);
            });
            process.on("exit", (code) => {
                console.log(`[Teox] <exit> ${code}`);
            });
        });
    }
    ;
    serverCreate() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[Teox] <Process> Loading server *Create*`);
            console.log(`[Teox] <Process> Loading server *Listeners*`);
            // LISTENERS
            this.listeners();
            console.log(`[Teox] <Process> Loaded server *Listeners*`);
            console.log(`[Teox] <Process> Loading server *Middleware*`);
            // MIDDLEWARE
            this.app.use(express_1.default.json());
            this.app.use(express_1.default.urlencoded({ extended: true }));
            console.log(`[Teox] <Process> Loaded server *Middleware*`);
            console.log(`[Teox] <Process> Loading server *Cors*`);
            // CORS 
            this.app.use((0, cors_1.default)({ credentials: true, methods: ["GET", "POST", "DELETE"] }));
            console.log(`[Teox] <Process> Loaded server *Cors*`);
            console.log(`[Teox] <Process> Loading server *Public Folder*`);
            // PUBLIC
            this.app.use(express_1.default.static("./public"));
            console.log(`[Teox] <Process> Loaded server *Public Folder*`);
            console.log(`[Teox] <Process> Loading server *Routers*`);
            // ROUTERS
            yield this.routers.loadRouters();
            this.app.use("/api", this.routers.router);
            this.app.all("/", (req, res) => { return res.json({ status: 200, message: "online" }); });
            console.log(`[Teox] <Process> Loaded server *Routers*`);
            console.log(`[Teox] <Process> Loading server *Servers*`);
            // SERVERS
            console.log(`=========================================================================`);
            console.log(`[Teox] <Process> Loading server *Http*`);
            const httpServer = http_1.default.createServer(this.app);
            console.log(`[Teox] <Process> Loaded server *Http*`);
            console.log(`=========================================================================`);
            console.log(`[Teox] <Process> Loading server *Https*`);
            const httpsServer = https_1.default.createServer(this.httpsConfig, this.app);
            console.log(`[Teox] <Process> Loaded server *Https*`);
            console.log(`=========================================================================`);
            return { httpServer, httpsServer };
        });
    }
    ;
}
;
exports.default = server;
