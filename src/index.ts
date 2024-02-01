
import * as dotenv from 'dotenv'
import { env } from 'process'
import Server from './api/server';
import { _DataBase } from './database';

dotenv.config()

const server = Server.init(Number(env.PORT))
server.start(() => {
  console.log('Server on fire ' + env.PORT)
  _DataBase.instance
})

