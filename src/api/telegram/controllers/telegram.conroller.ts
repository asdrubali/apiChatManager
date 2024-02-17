
import { Request, Response, request } from "express";
import { createBotTelegramService } from "../services/create/telegram.service";
import { _DataBase } from "src/database";
import { QueryTypes } from "sequelize";
import { initBotTelegram } from "../templates/rentCars";




export const telegramController = async (req: Request, res: Response) => {
    try {
        
        const { idUser, idToken }= req.body;

        console.log({ idUser, idToken });
        

        if(!idToken){
          res.status(400).json({msg: "es necesario enviar el token"})
        }


        const existChat = await _DataBase.instance.chatBot.findOne({
          where:{
            token_id: idToken
          }
        })

        if(!existChat){

          const newChat = _DataBase.instance.chatBot.create({
            user_id: idUser,
            token_id: idToken,
            created_by: 1,
            tech: 'telegram',
            template: '1',
          })
        }

        initBotTelegram(idToken)

        const result = await createBotTelegramService(idToken)
        
        res.status(200).json({
          msg: `Telegram activo con el token ${idToken}`
        })
 
      } catch (error) {
        console.log('Unable to connect to the database:', error);
      }

}