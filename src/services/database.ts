import mongoose from "mongoose";

class db {
    db: typeof mongoose;

    constructor() {
        this.db = mongoose;
    };

    async start() {
        return this.db.connect(process.env.DATABASE_URL!!);
    };

};

export default db;
