import { Sequelize } from 'sequelize'
import { configDb } from './config/config';
import { clientFactory, clientStatic } from 'src/database/models/clients.model';
import { bookingFactory, bookingStatic } from 'src/api/whatsapp/database/models/booking.model';
import { templateFactory, templateStatic } from 'src/api/whatsapp/database/models/template.model';
import { RentCarStatic, rentCarFactory } from 'src/api/whatsapp/templates/rentCars/models/rentCar.model';
import { CarsStatic, carFactory } from 'src/api/whatsapp/templates/rentCars/models/car.model';
import { SucursalFactory, SucursalStatic } from 'src/api/whatsapp/templates/rentCars/models/sucursal.model';
import { TypeCarFactory, TypeCarStatic } from 'src/api/whatsapp/templates/rentCars/models/type_car.model';
import { FrequenTQuestionsFactory, FrequenTQuestionsStatic, FrequentQuestionsAttributes } from 'src/api/whatsapp/database/models/frequent_questions.model';
import { UserFactory, UserStatic } from 'src/api/users/models/user.model';
import { TokenFactory, TokenStatic } from 'src/api/token/models/token.model';



export class _DataBase {
  private static _instance: _DataBase
  public sequelize: Sequelize
  private _config = configDb

  public user: UserStatic

  public client: clientStatic

  public booking: bookingStatic

  public template: templateStatic

  public RentCar: RentCarStatic

  public Cars: CarsStatic

  public Sucursal: SucursalStatic

  public TypeCar: TypeCarStatic

  public FrequenTQuestions: FrequenTQuestionsStatic
  
  public token: TokenStatic;

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
    this.user = UserFactory(this.sequelize);
    this.template = templateFactory(this.sequelize);
    this.RentCar = rentCarFactory(this.sequelize);
    this.Cars = carFactory(this.sequelize);
    this.Sucursal = SucursalFactory(this.sequelize);
    this.TypeCar = TypeCarFactory(this.sequelize);
    this.FrequenTQuestions = FrequenTQuestionsFactory(this.sequelize);
    this.token = TokenFactory(this.sequelize);

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

        
        // this.template.sync({ alter: true, logging: console.log });
        
        // this.RentCar.sync({ alter: true, logging: console.log });
        
        // this.Cars.sync({ alter: true, logging: console.log });
        
        // this.Sucursal.sync({ alter: true, logging: console.log });

        // this.TypeCar.sync({ alter: true, logging: console.log });
        
        // this.FrequenTQuestions.sync({ alter: true, logging: console.log });

        // this.token.sync({ alter: true, logging: console.log })

        // this.user.sync({ alter: true, logging: console.log });
        
        console.log('¡Run database!')
      })
      .catch((err) => console.log('error', err))
  }
  private associations(): void {

  }
}








