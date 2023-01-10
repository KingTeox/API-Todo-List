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

    async loadRouters() {
        console.log(`[Teox] <Routers> Loading all *Routers*`);
        
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
            return res.json(await this.db.delete(id));
        });

        this.router.get("/list/:id", async (req, res) => {
            const id = req.params.id;
        
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
