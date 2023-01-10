"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log(`[Teox] <Process> Reading: *Files*`);
const system_1 = __importDefault(require("./services/system"));
try {
    const System = new system_1.default();
    System.start();
}
catch (error) {
    console.log(`[Teox] <System> ${error}`);
}
;
console.log(`[Teox] <Process> Readed: *Files*`);
