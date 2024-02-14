import { Op, Transaction } from "sequelize";
import moment from "moment";
import { _DataBase } from "src/database";

export const closeAllSessions = async ({
  user_id,
  transaction,
}: {
  user_id: number;
  transaction?: Transaction;
}) => {
  return await _DataBase.instance.token.update(
    {
      status: false,
    },
    {
      where: {
        user_id,
        status: true
      },
      transaction,
    }
  );
};

export const updateLastRequest = async ({
  uuid,
  transaction,
}: {
  uuid: string;
  transaction?: Transaction;
}) => {
  return await _DataBase.instance.token.update(
    {
      last_request_at: moment().utc().toDate(),
    },
    {
      where: {
        uuid,
        status: true
      },
      transaction,
    }
  );
};
