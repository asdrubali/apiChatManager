import { QueryTypes } from "sequelize"
import { dataBase } from "../database/config/config.js"





export const getTokenTelegramById = async ( botId ) => {
    try {
        let query = 
        `
        SELECT * FROM public."chatBot" WHERE "id" = ${botId};
        `
        const data = await dataBase.query( query  , {
            type: QueryTypes.SELECT
        })

        if(!data)throw Error('no se encontro el bot')

        return data[0]
        
    } catch (error) {
        console.error(error)
    }
}