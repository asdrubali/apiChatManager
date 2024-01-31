import BotWhatsapp from '@bot-whatsapp/bot';
import ProviderWS from '@bot-whatsapp/provider/baileys'

export const adProvider = BotWhatsapp.createProvider(ProviderWS)