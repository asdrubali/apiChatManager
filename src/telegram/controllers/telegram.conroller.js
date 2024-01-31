
import { request } from "express";
import { createBotTelegramService } from "../services/create/botTelegram.service.js";



export const telegramController = async (req = request, res) => {
    try {
        
        const { id, session }= req.body;

        const result = await createBotTelegramService(botId = id)
        
        res.status(200).json(result)
 
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }

}