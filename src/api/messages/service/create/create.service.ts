import { _DataBase } from "src/database";

export const createMessageService = async (dataBody: any) => {
  const ts = await _DataBase.instance.sequelize.transaction();
  try {

    // const current_conversation = await _DataBase.instance.conversation.findByPk(idConversation)

    // console.log(dataBody);
    
    const contact = await _DataBase.instance.contact.findOne({
      where:{
        phone: dataBody.phone
      }
    })

    

    const new_message = await _DataBase.instance.message.create(
      {
        content: dataBody.content,
        date: new Date().toISOString(),
        sender_id: contact.id,
        contact_id: contact.id,
        conversation_id: 2,
        created_by: 1,
      },
      {
        transaction: ts,
      }
    );

    await ts.commit();

    return "new_message";
  } catch (error) {
    await ts.rollback();
    throw error;
  }
};


