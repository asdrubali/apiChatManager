import { getTokenTelegramById } from "../../helpers/getTokenTelegramById"
import { initBotTelegram } from "../../templates/rentCars"



export const createBotTelegramService = async (botId) => {
    try {

        const data: any = await getTokenTelegramById(botId)
        
        initBotTelegram(data.tokenID)

        return data
        
    } catch (error) {
        console.error(error)
    }
}