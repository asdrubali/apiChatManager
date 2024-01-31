import { Router } from "express";
import { whatsAppBotGetQr, whatsAppBotInitController_3 } from "../controller/whatsApp.controller";


const routerWhatsApp = Router()

// routerWhatsApp.post('/chatWs', chatController) 

routerWhatsApp.get('/callback', whatsAppBotInitController_3)
routerWhatsApp.get("/qr", whatsAppBotGetQr)


export default routerWhatsApp
