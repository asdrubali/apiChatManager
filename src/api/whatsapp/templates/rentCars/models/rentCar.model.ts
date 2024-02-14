import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface RentCarAttributes {
  id: number;

  chat_bot_id: string;
  description: string;
  car_id: number;
  sucursales_id: number;
  catalogo_id: number;
  is_active: boolean;

  created_at?: Date | null;
  created_by?: number | null;
  updated_at?: Date | null;
  updated_by?: number | null;
}



export interface RentCarPartialAttributes
  extends Partial<RentCarAttributes> {}

export interface RentCarModel
  extends Model<RentCarAttributes>,
    RentCarAttributes {}
export class rentCar extends Model<
  RentCarModel,
  RentCarAttributes
> {}

export type RentCarStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): RentCarModel;
};

export function rentCarFactory(sequelize: Sequelize): RentCarStatic {
  return <RentCarStatic>sequelize.define(
    "rentCar",
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      chat_bot_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      car_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      
      sucursales_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      
      catalogo_id: {
        type: DataTypes.BIGINT,
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
      tableName: "rentCar",
      timestamps: false,
    }
  );
}




