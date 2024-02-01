import { _DataBase } from "src/database"
import { clientAttributes } from "../../database/models/clients.model"
import { Transaction } from "sequelize";


export const createClient = async (clientData: clientAttributes) => {

    const t : Transaction = await _DataBase.instance.sequelize.transaction();
    try {
        
        const newClient = await _DataBase.instance.client.create(clientData, { transaction: t })

        if(!newClient){
            await t.rollback();
        }

        await t.commit();

        return newClient;

    } catch (error: any) {
        await t.rollback();
        console.error(error);
        throw error;
    }
}