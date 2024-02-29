import { _DataBase } from "src/database";

export const createMessageService = async ({
  dataBody,
}: {
  dataBody: any;
}) => {
  const ts = await _DataBase.instance.sequelize.transaction();
  try {
    const new_message = await _DataBase.instance.message.create(
      {
        id: 0,
        ...dataBody,
        created_by: 1,
      },
      {
        transaction: ts,
      }
    );

    await ts.commit();

    return new_message;
  } catch (error) {
    await ts.rollback();
    throw error;
  }
};
