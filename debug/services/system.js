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
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("./server"));
class system {
    constructor() {
        console.log(`[Teox] <System> Loaded *Class*`);
        dotenv_1.default.config();
        console.log(`[Teox] <System> Loaded *Env Config*`);
        this.server = new server_1.default();
    }
    ;
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[Teox] <System> Starting *Server*`);
            const servidores = yield this.server.serverCreate();
            console.log(`[Teox] <System> Starting *httpServer*`);
            servidores.httpServer.listen(80, () => {
                console.log(`[Teox] <httpServer> Online port: 80`);
            });
            console.log(`[Teox] <System> Starting *httpsServer*`);
            servidores.httpsServer.listen(443, () => {
                console.log(`[Teox] <httpsServer> Online port: 443`);
            });
        });
    }
    ;
}
;
exports.default = system;
