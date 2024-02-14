import moment from "moment";
import { Transaction, literal } from "sequelize";
import { _DataBase } from "src/database";

export const disableOrEnableUserById = async ({
  userId,
  updatedBy,
  transaction,
}: {
  userId: number;
  updatedBy?: number;
  transaction?: Transaction;
}) => {
  try {
    return await _DataBase.instance.user.update(
      {
        status: literal("CASE WHEN status = true THEN false ELSE true END"),
        updated_date: moment().utc().toDate(),
        updated_by: updatedBy,
      },
      {
        where: {
          id: userId,
        },
        transaction,
      }
    );
  } catch (error) {
    throw error;
  }
};
