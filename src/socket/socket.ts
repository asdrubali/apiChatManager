import { Server as HTTPServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';

export default function configureSocket(server: HTTPServer) {
    const io = new SocketIOServer(server,{
                cors:{
          origin:"*"//'http://127.0.0.1:5500',//process.env.PROY_FEURL,
          // credentials: true
        }
      })

    

    io.on('connection', (socket: Socket) => {
        console.log('Usuario conectado');

        // Manejar eventos de mensajes
        socket.on('newChatMessage', (mensaje: string) => {
            console.log('Mensaje recibido:', mensaje);
            // Aquí podrías guardar el mensaje en la base de datos usando Sequelize
            // y luego emitir el mensaje a todos los clientes conectados
            io.emit('newChatMessage', mensaje);
        });

        socket.on('disconnect', () => {
            console.log('Usuario desconectado');
        });
    });
}
