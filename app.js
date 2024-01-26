import Server from "./src/server.js"
import * as dotenv from 'dotenv'
import { env } from 'process'

dotenv.config()

const server = Server.init(Number(env.PORT))
server.start(() => {
  console.log('Server on fire ' + env.PORT)
})

