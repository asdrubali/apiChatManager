import { _DataBase } from "src/database";

export const deleteConversationServices = async (conversationId: number ) => {
  try {
    return await _DataBase.instance.conversation.update(
        {
            is_deleted: true,
        },
        {
        where:{
            id: conversationId
        }
    });
  } catch (error) {
    throw error;
  }
};
