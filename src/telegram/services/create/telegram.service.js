import { getTokenTelegramById } from "../../../helpers/getTokenTelegramById.js"
import { initBotTelegram } from "../../tenmplates/botTelegram.js"


export const createBotTelegramService = async (botId) => {
    try {

        const data = await getTokenTelegramById(botId)
        
        initBotTelegram(data.tokenID)

        return data
        
    } catch (error) {
        console.error(error)
    }
}