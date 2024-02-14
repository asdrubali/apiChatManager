import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface CarsAttributes {
  id: number;

  model: string;
  brand: string;
  type_car_id: number,
  number_seats: number;
  mileage: number;
  price: number;
  description: string;
  image_url: string;

  is_active: boolean;

  created_at?: Date | null;
  created_by?: number | null;
  updated_at?: Date | null;
  updated_by?: number | null;
}



export interface CarsPartialAttributes
  extends Partial<CarsAttributes> {}

export interface CarsModel
  extends Model<CarsAttributes>,
    CarsAttributes {}
export class Cars extends Model<
  CarsModel,
  CarsAttributes
> {}

export type CarsStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): CarsModel;
};

export function carFactory(sequelize: Sequelize): CarsStatic {
  return <CarsStatic>sequelize.define(
    "cars",
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      model: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      type_car_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      brand: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      number_seats: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      
      mileage: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },

    // PROPIEDADES DE AUDITORIA
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn("NOW"),
        allowNull: false,
      },
      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      initialAutoIncrement: "1",
      tableName: "cars",
      timestamps: false,
    }
  );
}




