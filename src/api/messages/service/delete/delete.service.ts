import { _DataBase } from "src/database";

export const deleteMessageServices = async (messageId: number ) => {
  try {
    return await _DataBase.instance.message.update(
        {
            is_deleted: true,
        },
        {
        where:{
            id: messageId
        }
    });
  } catch (error) {
    throw error;
  }
};
