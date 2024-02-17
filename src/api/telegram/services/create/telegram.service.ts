import { getTokenTelegramById } from "../../helpers/getTokenTelegramById"
import { initBotTelegram } from "../../templates/rentCars"



export const createBotTelegramService = async (tokenID: any) => {
    try {

        // const data: any = await getTokenTelegramById(tokenID)
        
        initBotTelegram(tokenID)

        return 'ok'
        
    } catch (error) {
        console.error(error)
    }
}