import { _DataBase } from "src/database";

export const createMessageService = async (dataBody: any) => {
  const ts = await _DataBase.instance.sequelize.transaction();
  try {

    // const current_conversation = await _DataBase.instance.conversation.findByPk(idConversation)

    console.log(dataBody);
    

    const new_message = await _DataBase.instance.message.create(
      {
        id: 0,
        content: dataBody.content,
        date: dataBody.date,
        sender_id: dataBody.sender,
        contact_id: 1,
        conversation_id: dataBody.idConversation,
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


