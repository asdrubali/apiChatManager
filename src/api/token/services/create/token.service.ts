import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { TokenAttributes } from "../../models/token.model";
import { Transaction } from "sequelize";
import { _DataBase } from "src/database";

export const createToken = async ({
  user_id,
  expires_at,
  transaction,
}: {
  user_id: number;
  expires_at?: Date;
  transaction?: Transaction;
}): Promise<TokenAttributes> => {
  try {

    console.log(  user_id,expires_at);
    

    return await _DataBase.instance.token.create(
      {
        user_id: user_id,
        uuid: uuidv4(),
        created_at: moment().utc().toDate(),
        last_request_at: moment().utc().toDate(),
        status: true,
        expires_at: expires_at || moment().add(4, "hours").toDate(),
      },
      { transaction }
    );
  } catch (err) {
    
    throw err;
  }
};
