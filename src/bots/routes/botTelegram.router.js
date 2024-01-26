import { Router } from "express";
import { telegramController } from "../controllers/botTelegram.conroller.js";

const routerTelegram = Router()

routerTelegram.post('/startTelegramBot', telegramController)


export default routerTelegram
