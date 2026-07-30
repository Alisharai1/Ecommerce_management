import { Sequelize } from "sequelize";

export const db = new Sequelize('ecommerce', 'User1', 'july', {
    host: 'localhost',
    dialect: 'postgres'
});


