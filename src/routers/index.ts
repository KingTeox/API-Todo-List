import express from "express";

import db from "../services/database";

/* EXTRA ROUTERS 

Example: import extraRout from "./extraRout/index.ts";

*/

class routersManager {

    router: express.Router
    db: db;

    constructor() { 
        this.router = express.Router();
        this.db = new db();
    };
    
    async verify(str: string, res: express.Response) {

        console.log(`[Teox] <verifyStr> ${str}`);

        let Achados = str.search(/\$/g);

        console.log(`[Teox] <verifyStr> ${Achados}`);

        if (Achados != -1) {
            //setTimeout(() => { })
            return res.json({ status: "Failed", message: "Blocked Action" });
        };
        return 1;
    };

    async loadRouters() {
        console.log(`[Teox] <Routers> Loading all *Routers*`);
        
        this.router.use(async (req, res, next) => {
            const { id, message } = req.body;
            
            if (id) {
                console.log(`[Teox] <Protection> Starting Verify: ${id}`);
                const idVerify = await this.verify(id, res);
                console.log(`[Teox] <Protection> Sucess Verify ${idVerify}: id`);
            };

            if (message) {
                console.log(`[Teox] <Protection> Starting Verify: ${message}`);
                const messageVerify = await this.verify(message, res);
                console.log(`[Teox] <Protection> Sucess Verify ${messageVerify}: message`);
            };

            return next();
        });

        this.router.all("/", (req, res) => { 
            return res.json({ status: 200, message: "Server Response :)" });
        });

        this.router.post("/list", async (req, res) => {
            const { id, message } = req.body;
            if (!id) { return res.json({ status: "Falha", message: `Sem id no post` }); };
            if (!message) { return res.json({ status: "Falha", message: `Sem message no post` }); };
            return res.json(await this.db.create(id, message));
        });

        this.router.delete("/list/:id", async (req, res) => {
            const id = req.params.id;
            await this.verify(id, res);
            return res.json(await this.db.delete(id));
        });

        this.router.get("/list/:id", async (req, res) => {
            const id = req.params.id!!;
            await this.verify(id, res);
            return res.json(await this.db.get(id));
        });

        this.router.get("/list/all", async (req, res) => {
            const findAll = await this.db.all();
            return res.json({
                status: findAll.status,
                documents: findAll.achados
            });
        });

        this.router.use((req, res, next) => {
            return res.json({ status: "Falhou", message: `Nao achei esse endpoint` });
        });

        console.log(`[Teox] <Routers> Loaded returning all *Routers*`)
        return this.router;
    };
};

export default routersManager;
