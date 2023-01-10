import dotenv from "dotenv";

import server from "./server";

class system {

    server: server;

    constructor() {
        console.log(`[Teox] <System> Loaded *Class*`);
        dotenv.config();
        console.log(`[Teox] <System> Loaded *Env Config*`);
        this.server = new server();
    };

    async start() {
        console.log(`[Teox] <System> Starting *Server*`);
        const servidores = await this.server.serverCreate();

        console.log(`[Teox] <System> Starting *httpServer*`);

        servidores.httpServer.listen(80, () => {
            console.log(`[Teox] <httpServer> Online port: 80`);
        });

        if (servidores.httpsServer) {
            console.log(`[Teox] <System> Starting *httpsServer*`);
            servidores.httpsServer.listen(443, () => {
                console.log(`[Teox] <httpsServer> Online port: 443`);
            });
        };
    };
};

export default system;
