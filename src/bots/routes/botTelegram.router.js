import { Router } from "express";
import { telegramController } from "../controllers/botTelegram.conroller.js";

const routerTelegram = Router()

routerTelegram.post('/startTelegramBot/:botId', telegramController)


export default routerTelegram
