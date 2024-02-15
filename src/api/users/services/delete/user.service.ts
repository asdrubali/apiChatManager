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
    const user = await _DataBase.instance.user.findByPk(userId)

    return await _DataBase.instance.user.update(
      {
        is_deleted: !user.is_deleted,
        updated_date: moment().utc().toDate(),
        updated_by: 1,
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
