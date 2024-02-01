import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface bookingAttributes {
  id: number;

  client_id: Number;
  date: string;
  type_car: string;
  sucursal: string;
  pickDate: string;
  status: boolean;

  created_at?: Date | null;
  created_by?: number | null;
  updated_at?: Date | null;
  updated_by?: number | null;
}



export interface bookingPartialAttributes
  extends Partial<bookingAttributes> {}

export interface bookingModel
  extends Model<bookingAttributes>,
    bookingAttributes {}
export class booking extends Model<
  bookingModel,
  bookingAttributes
> {}

export type bookingStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): bookingModel;
};

export function bookingFactory(sequelize: Sequelize): bookingStatic {
  return <bookingStatic>sequelize.define(
    "booking",
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      client_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type_car: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sucursal: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pickDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      status: {
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
      tableName: "booking",
      timestamps: false,
    }
  );
}




