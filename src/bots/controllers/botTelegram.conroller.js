
import { request } from "express";
import { createBotTelegramService } from "../services/create/botTelegram.service.js";



export const telegramController = async (req = request, res) => {
    try {
        
        const { botId }= req.params;

        const result = await createBotTelegramService(botId)
        
        res.status(200).json(result)
 
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }

}