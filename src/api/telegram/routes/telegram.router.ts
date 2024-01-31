import { Router } from "express";
import { telegramController } from "../controllers/telegram.conroller";


const routerTelegram = Router()

routerTelegram.post('/startTelegramBot', telegramController)


export default routerTelegram
