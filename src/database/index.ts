import { Sequelize } from 'sequelize'
import { configDb } from './config/config';
import { clientFactory, clientStatic } from 'src/database/models/clients.model';
import { bookingFactory, bookingStatic } from 'src/api/whatsapp/database/models/booking.model';



export class _DataBase {
  private static _instance: _DataBase
  public sequelize: Sequelize
  private _config = configDb

  public client: clientStatic
  public booking: bookingStatic

  constructor() {
    this.sequelize = new Sequelize(
      this._config.DB_NAME!,
      this._config.DB_USER!,
      this._config.DB_PASSWORD,
      {
        host: this._config.DB_HOST,
        port: Number(this._config.DB_PORT),
        logging: false,
        dialect: 'postgres',
        pool: {
          max: 5,
          min: 0,
          idle: 10000,
        },
      }
    )
    this.client = clientFactory(this.sequelize);
    this.booking = bookingFactory(this.sequelize);

    this.associations()
    this.connectDb()
  }
  public static get instance(): _DataBase {
    return this._instance || (this._instance = new this())
  }
  private connectDb(): void {

    
    this.sequelize
      .authenticate()
      .then(() => {

        // this.client.sync({ alter: true, logging: console.log });
        // this.booking.sync({ alter: true, logging: console.log });

        console.log('¡Run database!')
      })
      .catch((err) => console.log('error', err))
  }
  private associations(): void {

  }
}








