import { Telegraf, Markup, Scenes } from "telegraf"

// const scenarioTypeScene = new Scenes.BaseScene('SCENARIO_TYPE_SCENE_ID');

// scenarioTypeScene.enter((ctx) => {
//     ctx.session.myData = {};
//     ctx.reply('What is your drug?', Markup.inlineKeyboard([
//       Markup.callbackButton('Movie', MOVIE_ACTION),
//       Markup.callbackButton('Theater', THEATER_ACTION),
//     ]).extra());
//   });

//   scenarioTypeScene.action(THEATER_ACTION, (ctx) => {
//     ctx.reply('You choose theater');
//     ctx.session.myData.preferenceType = 'Theater';
//     return ctx.scene.enter('SOME_OTHER_SCENE_ID'); // switch to some other scene
//   });
  
//   scenarioTypeScene.action(MOVIE_ACTION, (ctx) => {
//     ctx.reply('You choose movie, your loss');
//     ctx.session.myData.preferenceType = 'Movie';
//     return ctx.scene.leave(); // exit global namespace
//   });


//   scenarioTypeScene.leave((ctx) => {
//     ctx.reply('Thank you for your time!');
//   });


interface IdataBooking {
    first_name: string
    last_name: string
    date: Date
    office: string
    type_car: string
    fecha_reserva: string

}


export const initBotTelegram = (token: any) =>{

    const bot = new Telegraf(token);    

    const dataBooking: any = {}

    // const stage = new Scenes.Stage([capturarFechaScene]);

    bot.use(Telegraf.log())
    // stage.command('cancel', leave()) 
    // const stage = new Scenes.Stage([scene1, scene2, scene3, ...]);
    // bot.use(session()); // to  be precise, session is not a must have for Scenes to work, but it sure is lonely without one
    // bot.use(stage.middleware())


    bot.start((ctx) =>{
        ctx.reply(
            `
            Este es un bot de renta de carros. Por favor, Pulse el boton INICIAR para empezar el proceso
            `,
            Markup
            .keyboard([
                ['Iniciar'], // Row1 with 2 buttons
              ])
              .oneTime()
              .resize()
            )
    })

    bot.hears('Iniciar', (ctx =>{
        // console.log({
        //     data_1:ctx.update.message.chat,
        //     data_2:ctx.update.message.from,
        //     data_3:ctx.update.message.chat,
        //     data_4:ctx.update.message.date,
        // });

        dataBooking.first_name = ctx.update.message.from.first_name ? ctx.update.message.from.first_name : ''
        dataBooking.last_name = ctx.update.message.from.last_name ? ctx.update.message.from.last_name : ''
        dataBooking.date = new Date().toISOString()
        
        ctx.reply(
            `
            En que sucursal desearia recogerlo ?
            `,
            Markup
            .keyboard([
                'Bogota', // Row1 with 2 buttons
                'Medellin', // Row1 with 2 buttons
                'Cali', // Row1 with 2 buttons
              ])
              .oneTime()
              .resize()
            )
    }))

    bot.hears([ 'Bogota', 'Medellin', 'Cali' ], (ctx) => {

        dataBooking.office = ctx.update.message.text

        ctx.reply('Ingrese el tipo de vehiculo que deasea',            
            Markup
            .keyboard([
                'Moto',
                'Pequeño', 
                'Mediano', 
                'Familiar', 
                'X cancelar solicitud'
            ])
            .oneTime()
            .resize()
        );

    })

    bot.hears([ 'Moto','Pequeño','Mediano','Familiar'], (ctx) => {

        dataBooking.type_car = ctx.update.message.text
        ctx.reply('Cuando dearia retirarlo, ingrese una fecha (DD/MM/YYYY)');
        ctx.deleteMessage()
        // ctx.deleteForumTopic()

    })

    bot.on('text', (ctx) => {

        const fechaRegex = /(\d{2}\/\d{2}\/\d{4})/;
        const match = ctx.message.text.match(fechaRegex);
      
        if (match) {

          const fechaCapturada = match[1];
          dataBooking.fecha_reserva = fechaCapturada
          ctx.reply(`¡Gracias! En breve nos pondremos en contacto contigo para ofrecerte la mejor opción.`);
          ctx.deleteMessage()
          
          console.log(dataBooking);

          bot.stop()

        } else {
          ctx.reply('No se ha encontrado una fecha en el mensaje.');
        //   ctx.callbackQuery()
        }

    });

    // bot.telegram.getMe().then((bot_informations) => {
    //     bot.options.username = bot_informations.username;
    //     console.log("Server has initialized bot nickname. Nick: "+bot_informations.username);
    // });
    


    // bot.command('start', (ctx) => ctx.reply('Bot started.'));
    
    // bot.hears('ymca', (ctx) => ctx.reply("*sing* It's fun to stay at the Y.M.C.A.!"));
    // bot.hears(/torino/i, (ctx) => ctx.reply("Someone said Torino!?"));
    
    // bot.on('inline_query', ctx => {
    //     let query = ctx.update.inline_query.query;  
    //     if(query.startsWith("/")){  
    //         if(query.startsWith("/audio_src")){ 
    
    //             return ctx.answerInlineQuery([
    //                 {
    //                     type: 'voice',  
    //                     id: ctx.update.inline_query.id,    
    //                     title: 'Send audio file sample.ogg',    
    //                     voice_url: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Example.ogg',
    //                     voice_duration: 16, 
    //                     caption: '[BOT] Audio file sample.ogg!' 
    //                 }
    //             ]);
    //         }
    //     }else{  
    //         let name_target = query;    
    //         let message_length = name_target.length;    
    //         if(message_length > 0){
    //             let full_message;
    //             let dice=Math.floor(Math.random()*8)+1; 
    //             switch(dice){
    //                 case 1: full_message = "IMHO, "+name_target+" sucks."; break;
    //                 case 2: full_message = "IMHO, "+name_target+" is awesome"; break;
    //                 case 3: full_message = name_target+" is not a nice people for me..."; break;
    //                 case 4: full_message = name_target+" for me you are c- Eh! You wanted!"; break;
    //                 case 5: full_message = "Whoa! "+name_target+" is very cool!"; break;
    //                 case 6: full_message = "Grifondoro! No wait, "+name_target+" you're such a noob."; break;
    //                 case 7: full_message = "Sometimes I ask myself why people like "+name_target+" dress up and walk around like that..."; break;
    //                 case 8: full_message = "Watch him! Watch! "+name_target+" is so ugly!"; break;
    //             }
                
    //             return ctx.answerInlineQuery([{
    //                 type: 'article',
    //                 id: ctx.update.inline_query.id, 
    //                 title: 'You have inserted: '+name_target, 
    //                 description: 'What does '+bot.options.username+' thinks about '+name_target+'?',
    //                 input_message_content: {message_text: full_message}
    //             }], {cache_time: 0});
    //         }
    //     }
    // })
    
    

    // bot.startPolling();
}



// const bot = new Telegraf('TU_TOKEN_DE_TELEGRAM');

// // Crear una nueva escena llamada 'capturarFecha'
// const capturarFechaScene = new Scenes.BaseScene('capturarFecha');

// // Middleware para capturar la fecha
// capturarFechaScene.on('text', (ctx) => {
//   const fechaRegex = /(\d{2}\/\d{2}\/\d{4})/; // Patrón para DD/MM/YYYY
//   const match = ctx.message.text.match(fechaRegex);

//   if (match) {
//     const fechaCapturada = match[1];
//     ctx.reply(Fecha capturada: ${fechaCapturada});
//     // Puedes realizar acciones adicionales con la fecha capturada si es necesario
//     ctx.scene.leave(); // Salir de la escena después de capturar la fecha
//   } else {
//     ctx.reply('No se ha encontrado una fecha válida. Por favor, envía una fecha en formato DD/MM/YYYY.');
//   }
// });

// // Middleware para repetir el mensaje si no se captura la fecha
// capturarFechaScene.use((ctx) => {
//   ctx.reply('Por favor, envía una fecha en formato DD/MM/YYYY.');
// });

// // Inicia el bot con la escena
// const stage = new Scenes.Stage([capturarFechaScene]);
// bot.use(session());
// bot.use(stage.middleware());

// bot.start((ctx) => {
//   // Inicia la escena 'capturarFecha' cuando el usuario usa /capturarfecha
//   ctx.scene.enter('capturarFecha');
// });

// bot.launch();






// const { Telegraf } = require('telegraf');

// const bot = new Telegraf('TU_TOKEN_DE_TELEGRAM');

// bot.start((ctx) => {
//   ctx.reply('¡Hola! Soy tu bot de Telegram. Puedes usar /capturarfecha para capturar una fecha.');
// });

// bot.command('capturarfecha', (ctx) => {
//   ctx.reply('Envía una fecha (DD/MM/YYYY) para capturarla.');
// });

// bot.on('text', (ctx) => {
//   const fechaRegex = /(\d{2}\/\d{2}\/\d{4})/; // Patrón para DD/MM/YYYY
//   const match = ctx.message.text.match(fechaRegex);

//   if (match) {
//     const fechaCapturada = match[1];
//     ctx.reply(Fecha capturada: ${fechaCapturada});
//   } else {
//     ctx.reply('No se ha encontrado una fecha en el mensaje.');
//   }
// });

// bot.launch();


// return ctx.reply(
//     'Special buttons keyboard',
//     Markup.keyboard([
//       Markup.button.contactRequest('Send contact'),
//       Markup.button.locationRequest('Send location'),
//     ]).resize()     
//     )



// bot.start((ctx) =>{
//     ctx.reply(
//         `
//         Este es un bot de renta de carros.  

//         Por favor, proporciona la siguiente información para rentar un coche
//         Iniciar
//         `)
// })

// bot.command('onetime', (ctx) =>
// ctx.reply('One time keyboard', Markup
//   .keyboard(['/simple', '/inline', '/pyramid'])
//   .oneTime()
//   .resize()
// )
// )


// bot.hears('🔍 Search', ctx => ctx.reply('Yay!'))
// bot.hears('📢 Ads', ctx => ctx.reply('Free hugs. Call now!'))

// bot.command('special', (ctx) => {
// return ctx.reply(
//   'Special buttons keyboard',
//   Markup.keyboard([
//     Markup.button.contactRequest('Send contact'),
//     Markup.button.locationRequest('Send location')
//   ]).resize()
// )
// })

// bot.command('pyramid', (ctx) => {
// return ctx.reply(
//   'Keyboard wrap',
//   Markup.keyboard(['one', 'two', 'three', 'four', 'five', 'six'], {
//     wrap: (btn, index, currentRow) => currentRow.length >= (index + 1) / 2
//   })
// )
// })

// bot.command('simple', (ctx) => {
// return ctx.replyWithHTML(
//   '<b>Coke</b> or <i>Pepsi?</i>',
//   Markup.keyboard(['Coke', 'Pepsi'])
// )
// })

// bot.command('inline', (ctx) => {
// return ctx.reply('<b>Coke</b> or <i>Pepsi?</i>', {
//   parse_mode: 'HTML',
//   ...Markup.inlineKeyboard([
//     Markup.button.callback('Coke', 'Coke'),
//     Markup.button.callback('Pepsi', 'Pepsi')
//   ])
// })
// })

// bot.command('random', (ctx) => {
// return ctx.reply(
//   'random example',
//   Markup.inlineKeyboard([
//     Markup.button.callback('Coke', 'Coke'),
//     Markup.button.callback('Dr Pepper', 'Dr Pepper', Math.random() > 0.5),
//     Markup.button.callback('Pepsi', 'Pepsi')
//   ])
// )
// })

// bot.command('caption', (ctx) => {
// return ctx.replyWithPhoto({ url: 'https://picsum.photos/200/300/?random' },
//   {
//     caption: 'Caption',
//     parse_mode: 'Markdown',
//     ...Markup.inlineKeyboard([
//       Markup.button.callback('Plain', 'plain'),
//       Markup.button.callback('Italic', 'italic')
//     ])
//   }
// )
// })

// bot.hears(/\/wrap (\d+)/, (ctx) => {
// return ctx.reply(
//   'Keyboard wrap',
//   Markup.keyboard(['one', 'two', 'three', 'four', 'five', 'six'], {
//     columns: parseInt(ctx.match[1])
//   })
// )
// })

// bot.action('Dr Pepper', (ctx, next) => {
// return ctx.reply('👍').then(() => next())
// })

// bot.action('plain', async (ctx) => {
// await ctx.answerCbQuery()
// await ctx.editMessageCaption('Caption', Markup.inlineKeyboard([
//   Markup.button.callback('Plain', 'plain'),
//   Markup.button.callback('Italic', 'italic')
// ]))
// })

// bot.action('italic', async (ctx) => {
// await ctx.answerCbQuery()
// await ctx.editMessageCaption('_Caption_', {
//   parse_mode: 'Markdown',
//   ...Markup.inlineKeyboard([
//     Markup.button.callback('Plain', 'plain'),
//     Markup.button.callback('* Italic *', 'italic')
//   ])
// })
// })

// bot.action(/.+/, (ctx) => {
// return ctx.answerCbQuery(`Oh, ${ctx.match[0]}! Great choice`)
// })





// // Enable graceful stop
// process.once('SIGINT', () => bot.stop('SIGINT'))
// process.once('SIGTERM', () => bot.stop('SIGTERM'))