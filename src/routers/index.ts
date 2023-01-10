import express from "express";

/* EXTRA ROUTERS 

Example: import extraRout from "./extraRout/index.ts";

*/

class routersManager {

    router: express.Router

    constructor() { 
        this.router = express.Router();
    };

    async loadRouters() {
        console.log(`[Teox] <Routers> Loading all *Routers*`);
        
        this.router.all("/", (req, res) => { 
            return res.json({ status: 200, message: "Server Response :)" });
        });

        console.log(`[Teox] <Routers> Loaded returning all *Routers*`)
        return this.router;
    };
};

export default routersManager;
