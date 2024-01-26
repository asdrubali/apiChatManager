import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config()

import { env } from 'process'



export const dataBase = new Sequelize(
    String(env.DB_NAME),
    String(env.DB_USER),
    String(env.DB_PASSWORD),
    {
        host: String(env.DB_HOST),
        port: Number(env.DB_PORT),
        dialect: 'postgres'
    }
);

