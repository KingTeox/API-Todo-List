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
        console.log(`[Teox] <Database> Criar documento`);
        await this.verificador();

        const DocumentoCriar = await this.get(id);
        const Hoje = new Date().toISOString().slice(0, 10);
        
        if (DocumentoCriar.document) {
            console.log(`[Teox] <Database> Documento ja existe pra criar outro`);
            return { status: "Falhou", documento: DocumentoCriar.document };
        };

        const NovoDocumento = await modelTodo.create({
            _id: id,
            date: `${Hoje}`,
            message
        });
        console.log(`[Teox] <Database> Documento Criado`);
        await NovoDocumento.save();
        console.log(`[Teox] <Database> Documento Salvado`);
        return { status: "Criado", NovoDocumento };
    };

    async get(id: String) {
        console.log(`[Teox] <Database> Encontrar documento`);
        await this.verificador();
        
        const DocumentoProcurar = await modelTodo.findById(id);

        if (DocumentoProcurar) {
            return { status: "Sucesso", document: DocumentoProcurar };
        };

        if (id.length < 10) {
            return { status: "Falhou", message: "Nao foi encontrado o documento com esse ID" };
        };
        
        if (id.length != 10 && id.length > 10) {
            return { status: "Falhou", message: "Data invalida" };
        };

        const data = new Date(id.toString());

        const DocumentosMultiplos = await modelTodo.find({ date: data.toISOString().slice(0, 10) });

        if (DocumentosMultiplos) {
            console.log(`[Teox] <Database> Encontrado ${DocumentosMultiplos.length} criados em ${data.toISOString().slice(0, 10)}`);
            return { status: "Sucesso", documents: DocumentosMultiplos };
        };

        return { status: "Falhou", message: "Nao foi encontrado o documento com esse ID" };
    };

    async delete(id: String) {
        console.log(`[Teox] <Database> Deletar documento`);
        await this.verificador();

        const DocumentoDeletar = await this.get(id);

        if (DocumentoDeletar.message) {
            console.log(`[Teox] <Database> Documento nao existe pra deletar`);
            return { status: "Falhou", message: DocumentoDeletar.message };
        };
        console.log(`[Teox] <Database> Documento encontrado deletando`);

        const Deletado = await modelTodo.deleteOne({ _id: id });

        if (Deletado.deletedCount === 0) {
            console.log(`[Teox] <Database> Documento nao deletado aconteceu algum erro desconhecido`);
            return { status: "Falhou", message: `Falhou em deletar o documento` };
        };

        return { status: "Sucesso", message: `Documento deletado com sucesso` };
    };

    async all() {
        console.log(`[Teox] <Database> Procurar todos os documentos`);
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
