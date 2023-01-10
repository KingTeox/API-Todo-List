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

        this.router.post("/list", (req, res) => {
            return res.json({ status: "Falhou", message: "Desativado Temporariamente" });
        });

        this.router.delete("/list/:id", (req, res) => {

            const id = req.params.id;

            return res.json({ status: "Falhou", message: "Desativado Temporariamente" });
        });

        this.router.get("/list/:id", (req, res) => {
            
            const id = req.params.id;

            return res.json({ status: "Falhou", message: "Desativado Temporariamente" });
        });

        this.router.get("/list/all", async (req, res) => {
            
            const findAll = await this.db.all();

            return res.json({
                status: findAll.status,
                documents: findAll.achados
            });
        });

        console.log(`[Teox] <Routers> Loaded returning all *Routers*`)
        return this.router;
    };
};

export default routersManager;
