
import { Request, Response, request } from "express";
import { createBotTelegramService } from "../services/create/telegram.service";




export const telegramController = async (req: Request, res: Response) => {
    try {
        
        const { id, session }= req.body;

        const result = await createBotTelegramService( id)
        
        res.status(200).json(result)
 
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }

}