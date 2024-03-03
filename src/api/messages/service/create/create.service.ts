import { innitflowCatResponse } from "src/api/whatsapp/flow/chatFlow";
import { sendMessage } from "src/api/whatsapp/templates/rentCars/statickCarsRent";
import { _DataBase } from "src/database";

export const createMessageService = async (dataBody: any) => {
  const ts = await _DataBase.instance.sequelize.transaction();
  try {

    // const current_conversation = await _DataBase.instance.conversation.findByPk(idConversation)

    // console.log(dataBody);

    // innitflowCatResponse('holaaa')
    
    let contact: any = {}

    if(!!dataBody.phone){
      contact = await _DataBase.instance.contact.findOne({
        where:{
          phone: dataBody.phone
        }
      })
    }

    const result = await sendMessage(contact.phone, dataBody.content )

    

    const new_message = await _DataBase.instance.message.create(
      {
        content: dataBody.content,
        date: new Date().toISOString(),
        sender_id: dataBody.sender ? dataBody.sender : contact!.id ,
        contact_id: dataBody.sender ? dataBody.sender : contact!.id ,
        conversation_id: 2,
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

export const createMessage = async (dataBody: any) => {
  const ts = await _DataBase.instance.sequelize.transaction();
  try {

    // const current_conversation = await _DataBase.instance.conversation.findByPk(idConversation)

    // console.log(dataBody);

    innitflowCatResponse('holaaa')
    
    let contact: any = {}

    if(!!dataBody.phone){
      contact = await _DataBase.instance.contact.findOne({
        where:{
          phone: dataBody.phone
        }
      })
    }

    

    const new_message = await _DataBase.instance.message.create(
      {
        content: dataBody.content,
        date: new Date().toISOString(),
        sender_id: dataBody.sender ? dataBody.sender : contact!.id ,
        contact_id: dataBody.sender ? dataBody.sender : contact!.id ,
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


