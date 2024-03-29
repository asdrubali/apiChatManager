import "dotenv/config"
import BotWhatsapp from '@bot-whatsapp/bot'
import database from './database';
import flow from './flow';
import { initServer } from "./services/http";

/**
 * Funcion principal del bot
 */
export const mainBotWs = async (provider: any) => {


    const botFLow = BotWhatsapp.addKeyword('hola').addAnswer('Buenas!') as any

    console.log(botFLow.toJson())
    console.log({ botFLow })

    const botInstance = await BotWhatsapp.createBot({
        database,
        provider,
        flow
    })

    // initServer(botInstance)
}


// export const createBotWs = async (database: any, provider: any, flow: any) => {

//     const botInstance = await BotWhatsapp.createBot({
//         database,
//         provider,
//         flow
//     })

//     // initServer(botInstance)
// }
