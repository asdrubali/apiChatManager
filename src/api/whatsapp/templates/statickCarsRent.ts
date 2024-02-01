
import BotWhatsapp from '@bot-whatsapp/bot';
import { adProvider } from '../provider';
import database from '../database';
import { createClient } from '../../helpers/saveClient';
import { clientAttributes } from '../../../database/models/clients.model';
import { createBooking } from '../helpers/saveBookingStaticCar';
import { bookingAttributes } from '../database/models/booking.model';

const dataBooking = {} as bookingAttributes;
const dataClient = {} as clientAttributes;

const opcionesVehiculo = {
    '1': 'Motocicleta 🛵',
    '2': 'Pequeño 🚗',
    '3': 'Mediano 🚓',
    '4': 'Grande 🚙',
    '5': 'Familiar 🚐'
};

const opcionesSucursales = {
    '1': 'Cali',
    '2': 'Bogotá',
    '3': 'Medellín'
};

const opcionesTexto = Object.keys(opcionesVehiculo)
.map(key => ` *${key}*   👉 ${opcionesVehiculo[key]}`).join('\n');

const opcionesTextoSucursales = Object.keys(opcionesSucursales)
.map(key => `*${key}*   👉 ${opcionesSucursales[key]}`).join('\n');



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

    const adapterFlow = BotWhatsapp.createFlow([flowStaticRentCar])

    export const createBotWs = async () => {
        const botInstance = await BotWhatsapp.createBot({
            provider: adProvider,
            database: database,
            flow: adapterFlow
        })
    
        // initServer(botInstance)
    }
        