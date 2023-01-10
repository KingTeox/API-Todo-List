import express from "express";
import cors from "cors";

import fs from "fs";
import path from "path";
import http from "http";
import https from "https";

import database from "./database";

import routers from "../routers/index";


class server {

    app: express.Express;
    routers: routers;
    db: database;
    httpsConfig: { key: string, cert: string };

    constructor() {
        this.app = express();
        this.routers = new routers();
        this.db = new database();
        this.httpsConfig = { key: "Nao ativado", cert: "Nao ativado" };
        if (process.env.HTTPS === "true") {
            this.httpsConfig = { key: fs.readFileSync(path.join(__dirname, "../../certs/key.pem"), "utf-8"), cert: fs.readFileSync(path.join(__dirname, "../../certs/cert.pem"), "utf-8") };
        };
    };

    async protection() {
        // em breve
    };

    async listeners() {
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
    };

    async serverCreate() {

        console.log(`[Teox] <Process> Loading server *Create*`);
        console.log(`[Teox] <Process> Loading server *Listeners*`);

        // LISTENERS

        this.listeners();

        console.log(`[Teox] <Process> Loaded server *Listeners*`);
        console.log(`[Teox] <Process> Loading server *Middleware*`);
        
        // MIDDLEWARE

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        console.log(`[Teox] <Process> Loaded server *Middleware*`);
        console.log(`[Teox] <Process> Loading server *Cors*`);

        // CORS 

        this.app.use(cors({ credentials: true, methods: ["GET", "POST", "DELETE"] }))

        console.log(`[Teox] <Process> Loaded server *Cors*`);
        console.log(`[Teox] <Process> Loading server *Public Folder*`);

        // PUBLIC

        this.app.use(express.static("./public"));

        console.log(`[Teox] <Process> Loaded server *Public Folder*`);
        console.log(`[Teox] <Process> Loading server *Routers*`);

        // ROUTERS

        await this.routers.loadRouters();

        this.app.use((req, res, next) => {
            console.log(`[Teox] <Monitor> [${req.method.toUpperCase()}] ${req.path} from ${req.ip}`);
            next();
        });
        this.app.use("/api", this.routers.router);
        this.app.all("/", (req, res) => { return res.json({ status: 200, message: "online" }); });
        this.app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
            console.log(`[Teox] <Process> ${err}`);
            return res.status(500).json({ message: "Server Error" });
        });

        console.log(`[Teox] <Process> Loaded server *Routers*`);
        console.log(`[Teox] <Process> Loading server *Servers*`);

        // SERVERS
        
        console.log(`=========================================================================`);
        console.log(`[Teox] <Process> Loading server *Database*`);

        const status = await this.db.start();

        if (status) {
            console.log(`[Teox] <Process> Loaded server *Database*`);
        } else {
            console.log(`[Teox] <Process> Failed server connection *Database*`);
        };

        console.log(`=========================================================================`);
        console.log(`[Teox] <Process> Loading server *Http*`);
        
        const httpServer = http.createServer(this.app);

        console.log(`[Teox] <Process> Loaded server *Http*`);
        
        
        if (process.env.HTTPS === "true") {
            console.log(`=========================================================================`);
            console.log(`[Teox] <Process> Loading server *Https*`);
            
            const httpsServer = https.createServer(this.httpsConfig, this.app);
            
            console.log(`[Teox] <Process> Loaded server *Https*`);
            console.log(`=========================================================================`);
            return { httpServer, httpsServer };
        };  return { httpServer };
    };
};

export default server;
