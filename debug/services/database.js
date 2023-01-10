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
const mongoose_1 = __importDefault(require("mongoose"));
const todo_1 = __importDefault(require("../models/todo"));
class db {
    constructor() {
        this.db = mongoose_1.default;
        mongoose_1.default.set('strictQuery', true);
    }
    ;
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.connect(process.env.DATABASE_URL).then(() => {
                console.log(`[Teox] <Database> Connected :)`);
                return true;
            }).catch(err => {
                console.log(`[Teox] <Database> ${err}`);
                return false;
            });
        });
    }
    ;
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[Teox] <Database> allDocuments lookup`);
            if (mongoose_1.default.connection.readyState != 1) {
                return {
                    status: `Falhou`,
                    achados: `Falha de conexao com a database`
                };
            }
            ;
            const allDocumentes = yield todo_1.default.find({});
            console.log(`[Teox] <Database> Total found: ${allDocumentes.length}`);
            if (allDocumentes) {
                return { status: `Achados`, achados: allDocumentes };
            }
            ;
            return { status: `Algo deu errado..`, achados: "Invalid argument" };
        });
    }
    ;
}
;
exports.default = db;
