import { QueryTypes } from "sequelize"
import { _DataBase } from "src/database"






export const getTokenTelegramById = async ( tokenID ) => {
    try {
        let query = 
        `
        SELECT * FROM public."chatBot" WHERE "id" = ${tokenID};
        `
        const data = await _DataBase.instance.sequelize.query( query  , {
            type: QueryTypes.SELECT
        })

        if(!data)throw Error('no se encontro el bot')

        return data[0]
        
    } catch (error) {
        console.error(error)
    }
}