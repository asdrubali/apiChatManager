import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources";
import { generatePrompt, generatePromptDetermine } from "./prompt";
import { DATE_BASE_SUCURSAL } from "../../database/dataPlantilla/rentCars";
// import { DATE_BASE_SUCURSAL } from "src/whatsapp/database/dataPlantilla/rentCars";

const openai = new OpenAI({
    apiKey: "OFozwDAZAVo4yy5akSFmT3BlbkFJaeMtyoxFUJRx0k9Y4eC6",
});

/**
 * 
 * @param name 
 * @param history 
 */
const run = async (name: string, history: ChatCompletionMessageParam[]): Promise<string> => {

    const data = DATE_BASE_SUCURSAL

    const promtp = generatePrompt(name, data)
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                "role": "system",
                "content": promtp
            },
            ...history
        ],
        temperature: 1,
        max_tokens: 800,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
    return response.choices[0].message.content
}

const runDetermine = async (history: ChatCompletionMessageParam[]): Promise<string> => {

    const promtp = generatePromptDetermine()
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                "role": "system",
                "content": promtp
            },
            ...history
        ],
        temperature: 1,
        max_tokens: 800,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
    return response.choices[0].message.content
}

export { run, runDetermine }


