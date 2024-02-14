import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface SucursalAttributes {
  id: number;

  name: string;
  address: string;
  phone: string,
  email: string;
  idNumber: number;

  is_active: boolean;

  created_at?: Date | null;
  created_by?: number | null;
  updated_at?: Date | null;
  updated_by?: number | null;
}



export interface SucursalPartialAttributes
  extends Partial<SucursalAttributes> {}

export interface SucursalModel
  extends Model<SucursalAttributes>,
    SucursalAttributes {}
export class Sucursal extends Model<
  SucursalModel,
  SucursalAttributes
> {}

export type SucursalStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): SucursalModel;
};

export function SucursalFactory(sequelize: Sequelize): SucursalStatic {
  return <SucursalStatic>sequelize.define(
    "sucursal",
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      idNumber: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      
      email: {
        type: DataTypes.STRING,
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
      tableName: "sucursal",
      timestamps: false,
    }
  );
}




