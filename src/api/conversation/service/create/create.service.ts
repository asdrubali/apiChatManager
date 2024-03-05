import { _DataBase } from "src/database";

export const createConversationService = async ({
  dataBody,
  createBy
}: {
  dataBody: any;
  createBy: number;
}) => {
  const ts = await _DataBase.instance.sequelize.transaction();
  try {
    const new_message = await _DataBase.instance.conversation.create(
      {
        id: 0,
        user_id: createBy,
        contacts: dataBody.contacts,
        client_id: dataBody.client_id,
        type: "couple",
        created_by: createBy,
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
