import express, { Router } from 'express'
import morgan from 'morgan'
import cors from 'cors'

import routerTelegram from './bots/routes/botTelegram.router.js'

// const Router = Router()

export default class Server {

    constructor(port) {
      this._app = express()
      this._router = Router()
      this._port = port

      this.middlewares()
      this.routes()
      this.errors()
    }
  
    static init(port) {
      return new Server(port)
    }

    middlewares() {
      this._app.use(cors())
      this._app.use(morgan('dev'))
      this._app.use(express.json({ limit: '350mb' }))
      this._app.use(
        express.urlencoded({
          limit: '350mb',
          extended: true,
          parameterLimit: 350000,
        })
      )
    }
    
    routes() {

        this._app.use('/api', this._router);

        this._router.use('/telegram', routerTelegram)


    }
  
    errors() {
      this._router.use((req, res, next) => {
        const err = new Error(`Not Fount - ${req.originalUrl}`)
        res.status(404)
        next(err)
      })
      this._router.use((err, req, res, next) => {
        console.log(err.stack)
        res.status(err.status || 500).json({
          status: err.status,
          message: err.message,
          stack: err.stack,
        })
      })
    }
  
    start(callback){
      this._app.listen(this._port, callback)
    }
  }
  
  
  
  