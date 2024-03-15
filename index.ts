
import * as dotenv from 'dotenv'
import { env } from 'process'
import Server from './src/api/server';
import { _DataBase } from './src/database';
import { Server as SocketIO } from 'socket.io';
import http from 'http';

dotenv.config()

export const server = Server.init(Number(env.PORT))

export const _socket = server._socket



server.start(() => {
  console.log('Server on fire ' + env.PORT)
  _DataBase.instance
})

