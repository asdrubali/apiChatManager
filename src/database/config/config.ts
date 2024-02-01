import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config()

import { env } from 'process'


export interface IconfigDb {
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_HOST: string;
    DB_PORT: string;

}

export const configDb: IconfigDb = {
    DB_NAME: env.DB_NAME,
    DB_USER: env.DB_USER,
    DB_PASSWORD: env.DB_PASSWORD,
    DB_HOST: env.DB_HOST,
    DB_PORT: env.DB_PORT
}
