import { Sequelize } from "sequelize";

export class Database {
    static getDbInstance(input: {
        dbName: string,
        userName: string,
        password: string,
        host: string
    }) {
        const db = new Sequelize(input.dbName, input.userName, input.password, {
            host: input.host,
            dialect: 'postgres'
        });

        return db;
    }

    static async checkConnection(db: Sequelize) {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    }
}
