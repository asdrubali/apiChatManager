
import { NextFunction, Request, Response } from "express";
import { join } from "path";
import { createReadStream } from "fs";
import BotWhatsapp from '@bot-whatsapp/bot';
import database from "../database";

import flow from "../flow";
import { adProvider } from "../provider";
import { errorControl } from "src/api/functions/errorControl";
import { successResponse } from "src/api/functions/apiResponses";
import { getByIdCompanyServices } from "../services/find/find.service";




export const whatsAppBotInitController = async (req: Request, res: Response) => {
    try {

      

      const botFLow = BotWhatsapp.addKeyword('hola').addAnswer('Buenas!') as any

      console.log(botFLow.toJson())
      console.log({ botFLow })
  
      const botInstance = await BotWhatsapp.createBot({
          database,
          provider: adProvider,
          flow
      })

      
    

        const PATH_QR = join(process.cwd(), `bot.qr.png`);
        const fileStream = createReadStream(PATH_QR);

        res.writeHead(200, { "Content-Type": "image/png" });
        fileStream.pipe(res);
 
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }

}


export const whatsAppBotGetQr = async (req: Request, res: Response) => {
  const PATH_QR = join(process.cwd(), `bot.qr.png`);
  const fileStream = createReadStream(PATH_QR);
  res.writeHead(200, { "Content-Type": "image/png" });
  fileStream.pipe(res);
}

export const whatsAppBotInitController_3 = (req: Request, res: Response) => {
  const query = req.query
  console.log(`[QUERY]:`,query)

  if(query && query?.status === 'fail'){
      res.redirect(`https://app.codigoencasa.com`)
      return
  }

  res.send(`Todo Ok`)
}


export const rentCarTemplate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const resp = await getByIdCompanyServices()


    res.status(200).json(successResponse(resp, 200, 'plantillas obtenidas'));
  } catch (err: any) {
    errorControl(err, next);
  }
};
  