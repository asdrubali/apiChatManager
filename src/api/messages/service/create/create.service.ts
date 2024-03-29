

import { _socket } from "index";
import { innitflowCatResponse } from "src/api/whatsapp/flow/chatFlow";
import { sendMessage } from "src/api/whatsapp/templates/rentCars/statickCarsRent";
import { _DataBase } from "src/database";

export const createMessageService = async (dataBody: any) => {
  const ts = await _DataBase.instance.sequelize.transaction();
  try {

    // const current_conversation = await _DataBase.instance.conversation.findByPk(idConversation)

    // console.log(dataBody);

    // innitflowCatResponse('holaaa')
    
 

    

      const contact = await _DataBase.instance.contact.findOne({
        include: {
          model: _DataBase.instance.user
        },
        where:{
          id: parseInt(dataBody.client_id as string)
        }
      })

      if(!contact){
        return 'ho se pudo enviar'
      }
    
    
    const new_message = await _DataBase.instance.message.create(
      {
        content: dataBody.content,
        date: new Date().toISOString(),
        sender_id: 1,
        contact_id: 1,
        sender_user_id: dataBody.sender_user_id,
        conversation_id: dataBody.conversation_id,
        created_by: 1,
      },
      {
        transaction: ts,
      }
    );

    _socket.emit('newMessage', new_message);
    
    const result = await sendMessage(contact.phone, dataBody.content )

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

    // innitflowCatResponse('holaaa')

    const contact = await _DataBase.instance.contact.findOne({
        where:{
          phone: dataBody.phone
        }
      })
    
    const conversation = await _DataBase.instance.conversation.findOne({
        where:{
          contact_id: contact.id
        }
      })
    

    

    const new_message = await _DataBase.instance.message.create(
      {
        content: dataBody.content,
        date: new Date().toISOString(),
        sender_id: 1,
        contact_id: 1,
        sender_user_id: contact.user_id,
        conversation_id: conversation.id,
        created_by: 1,
      },
      {
        transaction: ts,
      }
    );

    _socket.emit('newMessage', new_message);
    

    await ts.commit();

    return "new_message";
  } catch (error) {
    await ts.rollback();
    throw error;
  }
};


