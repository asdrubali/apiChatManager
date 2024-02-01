import express, { Application, NextFunction, Request, Response, Router } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import routerTelegram from './telegram/routes/telegram.router'
import routerWhatsApp from './whatsapp/routes/whatsApp.router'
import { mainBotWs } from './whatsapp'
import { adProvider } from './whatsapp/provider'



interface CustomReq extends Request {
  providerWs: any
}

// const Router = Router()

export default class Server {

  private _app: Application
  private _port: number
  private _router: Router


    constructor(port: any) {
      this._app = express()
      this._router = Router()
      this._port = port

      this.middlewares()
      this.routes()
      this.errors()
      mainBotWs(adProvider)
    }
  
    static init(port: number) {
      return new Server(port)
    }

    middlewares() {
      this._app.use(cors())
      this._app.use(morgan('dev'))
      this._app.use((req: CustomReq, res: Response, next: NextFunction) =>{
        req.providerWs = adProvider
        next();
      })
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

        this._router.use('/whatsapp', routerWhatsApp)


    }
  
    errors() {
      this._router.use((req, res, next) => {
        const err = new Error(`Not Fount - ${req.originalUrl}`)
        res.status(404)
        next(err)
      })
      this._router.use((err: any, req: Request, res: Response, next: NextFunction) => {
        console.log(err.stack)
        res.status(err.status || 500).json({
          status: err.status,
          message: err.message,
          stack: err.stack,
        })
      })
    }
  
    start(callback: any){
      this._app.listen(this._port, callback)
    }
  }
