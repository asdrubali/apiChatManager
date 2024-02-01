import { _DataBase } from "src/database"
import { Transaction } from "sequelize";
import { bookingAttributes } from "../database/models/booking.model";


export const createBooking = async (bookingData: bookingAttributes) => {

    const t : Transaction = await _DataBase.instance.sequelize.transaction();
    try {
        
        const newBooking = await _DataBase.instance.booking.create(bookingData, { transaction: t })

        if(!newBooking){
            await t.rollback();
        }

        await t.commit();

        return newBooking;

    } catch (error: any) {
        await t.rollback();
        console.error(error);
        throw error;
    }
}