import mongoose from "mongoose";

import modelTodo from "../models/todo";

class db {
    db: typeof mongoose;

    constructor() {
        this.db = mongoose;
        mongoose.set('strictQuery', true);
    };

    async start() {
        return this.db.connect(process.env.DATABASE_URL!!).then(() => {
            console.log(`[Teox] <Database> Connected :)`);
            return true;
        }).catch(err => {
            console.log(`[Teox] <Database> ${err}`);
            return false;
        });
    };

    async verificador() {
        if (mongoose.connection.readyState != 1) {
            return { status: `Falhou`, message: `Falha de conexao com a database` }; 
        }; return { status: `Funcionando`, message: `100%` };
    };

    async create(id: String, message: String) {
        console.log(`[Teox] <Database> Document create`);
        await this.verificador();
        
    };
    async get(id: String) {
        console.log(`[Teox] <Database> Document find`);
        await this.verificador();
        
    };

    async delete(id: String) {
        console.log(`[Teox] <Database> Document delete`);
        await this.verificador();

    };

    async all() {
        console.log(`[Teox] <Database> allDocuments lookup`);
        await this.verificador();

        const allDocumentes = await modelTodo.find({});
        
        console.log(`[Teox] <Database> Total found: ${allDocumentes.length}`);
        
        if (allDocumentes) {
            return { status: `Achados`, achados: allDocumentes };
        };

        return { status: `Algo deu errado..`, achados: "Invalid argument" };
    };
};

export default db;
