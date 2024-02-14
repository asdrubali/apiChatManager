
import BotWhatsapp from '@bot-whatsapp/bot';
import { adProvider } from '../../provider';
import database from '../../database';
import { createClient } from '../../../../helpers/saveClient';
import { clientAttributes } from '../../../../database/models/clients.model';
import { createBooking } from '../../helpers/saveBookingStaticCar';
import { bookingAttributes } from '../../database/models/booking.model';
import Queue from 'queue-promise';
import handlerMessage from '../../helpers/message';
import { downloadMediaMessage } from '@whiskeysockets/baileys';
import fs from 'fs';
import { getDataFrecuentuestions, getListCars, getListSucursals, getListTypesCars } from '../helpers/getDataTemplate';
import { CarsAttributes } from './models/car.model';
import { TypeCarAttributes } from './models/type_car.model';
import { Sucursal, SucursalAttributes } from './models/sucursal.model';
import { _DataBase } from 'src/database';
import { QueryTypes } from 'sequelize';





const dataBooking = {} as bookingAttributes;
const dataClient = {} as clientAttributes;

// const opcionesVehiculo = {
//     '1': 'Motocicleta 🛵',
//     '2': 'Pequeño 🚗',
//     '3': 'Mediano 🚓',
//     '4': 'Grande 🚙',
//     '5': 'Familiar 🚐'
// };


// const opcionesSucursales = {
//     '1': 'Cali',
//     '2': 'Bogotá',
//     '3': 'Medellín'
// };

const dataCars: CarsAttributes[] = await getListCars();
const dataTypeCars: TypeCarAttributes[] = await getListTypesCars();
const dataSucursales: SucursalAttributes[] = await getListSucursals();

const opcionesSucursales = {};
const opcionesVehiculo = {};

dataSucursales.forEach((item, index) => {
    opcionesSucursales[index + 1] = item.name;
});
dataTypeCars.forEach((item, index) => {
    opcionesVehiculo[index + 1] = item.name;
});

const opcionesTexto = Object.keys(opcionesVehiculo)
.map(key => ` *${key}*   👉 ${opcionesVehiculo[key]}`).join('\n');

const opcionesTextoSucursales = Object.keys(opcionesSucursales)
.map(key => `*${key}*   👉 ${opcionesSucursales[key]}`).join('\n');


export const initFlowBack = 
    BotWhatsapp.addKeyword(['BACK', 'back', 'Back'])
    .addAction(async(ctx, {gotoFlow}) => {
        await gotoFlow(flowStaticRentCar)
    })


const initFlowCatalogo = 
    BotWhatsapp.addKeyword('FLOW_CAT')
    .addAnswer('Este es el catalogo que esta disponible', null, async (ctx, {flowDynamic, gotoFlow}) => {

        try {
            const dataCars: CarsAttributes[] = await getListCars()
            
    
            const data = []
    
            dataCars.forEach( async (item) => {
                const message = `*Modelo:* ${item.model} \*nMarca:* ${item.brand} \*nKilometraje:* ${item.mileage}km \*nPrecio:* ${item.price}$ \nNumero de *asientos:* ${item.number_seats}`

                data.push({
                    body: message,
                    media: item.image_url
                })
            } )
    
            await flowDynamic(data);
            await flowDynamic('Para volver al menu principal escriba "BACK"')
            
        } catch (error) {
            await flowDynamic('error al obtener el catalogo')
            await gotoFlow(flowStaticRentCar)
            
        }
    })


const initFlowRent =     
    BotWhatsapp.addKeyword('FLOW_RENT')
    .addAnswer(
    [
        'Que tipo de vehiculo desea rentar: \n',
        opcionesTexto
    ], {capture:true}, async (ctx, {flowDynamic, fallBack}) => {

        const regex = /^[1-5]$/;

        const type_car = ctx.body;

        if (regex.test(type_car)) {

        const tipoVehiculo = opcionesVehiculo[type_car];

        dataBooking.type_car = tipoVehiculo.split(' ')[0].toLowerCase()

        } else {
            return fallBack('Ingrese un tipo de vehiculo valido, intente de nuevo.')
        }

    })
.addAnswer(
    [
        'En que sucursal desea retirarlo ? \n',
        opcionesTextoSucursales
    ], {capture:true}, async (ctx, {flowDynamic, fallBack}) => {

        const regex = /^[1-3]$/;
        const sucursalSeleccionada = ctx.body;

        if (regex.test(sucursalSeleccionada)) {
            const sucursal = opcionesSucursales[sucursalSeleccionada];
            // console.log(`Seleccionaste: ${sucursal}`);
            dataBooking.sucursal = sucursal.split(' ')[0].toLowerCase()
            // console.log(dataBooking);
            
        } else {
            return fallBack('Ingrese una sucursal de las que tenemos disponibles, intente de nuevo.')
            
        }
        
    })
.addAnswer(
    [
        'Cuando dearia retirarlo, ingrese una fecha (DD/MM/YYYY)'
    ], {capture:true}, async (ctx, {flowDynamic, fallBack}) => {

        const pickDate = ctx.body

        const dateRegex = /(\d{2}\/\d{2}\/\d{4})/;

        if (dateRegex.test(pickDate)) {

            const [dia, mes, anio] = pickDate.split('/');
            dataBooking.pickDate = new Date(Number(anio), Number(mes) - 1, Number(dia)).toISOString()
            console.log(dataBooking);
            
        } else {
            return fallBack('Ingrese una fecha valida en formato dia/mes/año, intente de nuevo.')
        }
        
    })
    .addAnswer('Su solicitud esta casi lista, verifique sus datos antes de enviarla.',{capture: false},  async (ctx, {flowDynamic, fallBack}) => {

        const message =             
        `\n*DATOS DEL SOLICITANTE:*  \n\n*Nombre del solicitante :*  ${dataClient.name} \n*Apellido del solicitante :* ${dataClient.lastName} \n*Numero de documento :* 12345678 
        \n*DATOS DE LA SOLICITUD:* \n\n*Fecha de solicitud :*  ${new Date(dataBooking.date).toLocaleDateString()}, \n*Tipo de vehiculo:* ${dataBooking.type_car}, \n*Sucursal de recojo:*  ${(dataBooking.sucursal)} \n*Fecha de retiro:* ${new Date(dataBooking.pickDate).toLocaleDateString()}`
        
            await flowDynamic(message)
        
        })
    .addAnswer([
        'La informacion esta correcta ?',
        '✅ SI',
        '❌ NO'
    ], {capture: true}, async (ctx, {flowDynamic, fallBack, gotoFlow}) => {

        const res = ctx.body

        if(res.trim().toLowerCase() == 'si'){
            try {
                const newClient = await createClient(dataClient)
                await createBooking({
                    ...dataBooking,
                    client_id: newClient.id
                })
            } catch (error) {
                await flowDynamic('error al intentar guardar el cliente')   
                await gotoFlow(flowStaticRentCar)

            }
            await flowDynamic('Gracias por reservar con nosotros, un agente se pondra en contacto con usted para culminar su solicitud')
        }else{
            return fallBack('La respuesta tiene que ser SI o NO, , intente de nuevo.')
        }

    }
    )

const initFlowFrecuentuestions = 
    BotWhatsapp.addKeyword('FLOW_QUESTIONS')
    // .addAnswer('Preguntas frecuentes')
    .addAction(async (ctx, {flowDynamic}) => {

        let message = '';

        const respData = await getDataFrecuentuestions()
    
        respData.forEach( (item) =>{
            message += `👉 *${item.question}*\n\n${item.response}\n\n\n`;
        })
        await flowDynamic(message)
    })
    .addAnswer('Para volver al menu principal escriba "BACK"')



const initFlowSupportIA = 
    BotWhatsapp.addKeyword('FLOW_SUPPORT_IA')
    .addAnswer('Soporte IA')




const initFlowAgent = 
    BotWhatsapp.addKeyword('FLOW_AGENT')
    .addAnswer('Contacto agente')




const initFlowSoporte = 
    BotWhatsapp.addKeyword('FLOW_QUESTIONS')
    .addAnswer([
        'Bienvenido a la seccion de soporte aqui tiene unas opciones para poder ayudarlo: \n',
        '1 👉 Preguntas frecuentes',
        '2 👉 Asistencia con IA',
        '3 👉 Contactar con un agente',
        '',
        'Para volver al menu principal escriba "BACK"'
    ]
    ,{capture:true}, async (ctx, {gotoFlow}) => {

        const res = ctx.body;

       if(res == "1"){
        await gotoFlow(initFlowFrecuentuestions)
       }

       if(res == "2"){
        await gotoFlow(initFlowSupportIA)
       }

       if(res == "3"){
        await gotoFlow(initFlowAgent)
       }
    })



export const flowStaticRentCar = 
    BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.WELCOME)
    .addAnswer(
        `Este es un bot de renta de carros.Por favor, proporciona la siguiente información para rentar un coche
        `,null, async (ctx, {flowDynamic, fallBack}) => {
            dataClient.phone = ctx.from
            
            let fullName = ctx.pushName.split(' ');

            let name = fullName[0];
            let lastName = fullName.slice(1) ? fullName.slice(1).join(' ') : null

            dataClient.name = name
            dataClient.lastName = lastName

            dataBooking.date = new Date().toISOString()
        })
    .addAnswer(
        [
            '1 👉 Ver catalogo',
            '2 👉 Continuar con la renta',
            '3 👉 Soporte',
        ]
        ,{capture:true}, async (ctx, {gotoFlow}) => {

            const res = ctx.body;

           if(res == "1"){
            await gotoFlow(initFlowCatalogo)
           }

           if(res == "2"){
            await gotoFlow(initFlowRent)
           }

           if(res == "3"){
            await gotoFlow(initFlowSoporte)
           }
            
        })

    const adapterFlow = BotWhatsapp.createFlow(
        [
            initFlowBack,
            flowStaticRentCar,
            initFlowSupportIA,
            initFlowFrecuentuestions,
            initFlowCatalogo,
            initFlowSoporte,
            initFlowRent,
        ])


    const queue = new Queue({
        concurrent: 1,
        interval: 500
    })
    


export const createBotWs = async () => {
        const botInstance = await BotWhatsapp.createBot({
            provider: adProvider,
            database: database,
            flow: adapterFlow
        })

        

    /**
     * Los mensajes entrantes al bot (cuando el cliente nos escribe! <---)
     */

        adProvider.on('message', async (payload: any) => {
            console.log({DataMessage : payload});
            queue.enqueue(async () => {
                try {
                    const attachment: string[] = [];
        
                    // // Determina si el usuario está enviando una imagen, video o archivo
                    if (payload?.body.includes('_event_')) {

                        const mime = payload?.message?.imageMessage?.mimetype ?? 
                                     payload?.message?.videoMessage?.mimetype ?? 
                                     payload?.message?.documentMessage?.mimetype;
                        // const extension = mimeType.extension(mime);
                        // const buffer = await downloadMediaMessage(payload, "buffer", {} );
                        // const fileName = `file-${Date.now()}.${extension}`;
                        // const pathFile = `${process.cwd()}/public/${fileName}`;
                        // fs.writeFileSync(pathFile, buffer);
                        // console.log(`[ARCHIVO CREADO] http://localhost:3001/${fileName}`);
                        // attachment.push(pathFile);
                    }
        
                    await handlerMessage({
                        phone: payload.from,
                        name: payload.pushName,
                        message: payload.body,
                        attachment,
                        mode: 'incoming'
                    });

                } catch (err) {
                    console.log('ERROR', err);
                }
            });
        });


        // botInstance.on('send_message', (payload) => {
        //     queue.enqueue(async () => {
        //         await handlerMessage({
        //             phone: payload.numberOrId,
        //             name: payload.pushName,
        //             message: payload.answer,
        //             mode: 'outgoing'
        //         }, chatwoot)
        //     })
        // })
    
        // initServer(botInstance)
    }
        