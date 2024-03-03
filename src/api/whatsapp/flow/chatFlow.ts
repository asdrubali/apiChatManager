import BotWhatsapp from '@bot-whatsapp/bot';

let flow = null

const innitflowCatResponse = (message?: any) => {
    flow =
        BotWhatsapp.addKeyword('yy')
       .addAction( async (_, { flowDynamic } ) => {
        await flowDynamic(message)
       })

    return flow

}

innitflowCatResponse()

export { innitflowCatResponse, flow }