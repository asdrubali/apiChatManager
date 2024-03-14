import { Router } from "express";
import { whatsAppBotGetQr, whatsAppBotInitController_3 } from "../controller/whatsApp.controller";


const routerWhatsApp = Router()

// routerWhatsApp.post('/chatWs', chatController) 

routerWhatsApp.get('/callback', whatsAppBotInitController_3)
routerWhatsApp.get("/qr", whatsAppBotGetQr)
routerWhatsApp.get("/rent-car-ws", whatsAppBotGetQr)


export default routerWhatsApp
