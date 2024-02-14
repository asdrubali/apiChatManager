import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface TypeCarAttributes {
  id: number;

  name: string;
  description: string;

  is_active: boolean;
  created_at?: Date | null;
  created_by?: number | null;
  updated_at?: Date | null;
  updated_by?: number | null;
}



export interface TypeCarPartialAttributes
  extends Partial<TypeCarAttributes> {}

export interface TypeCarCarModel
  extends Model<TypeCarAttributes>,
    TypeCarAttributes {}
export class TypeCarCar extends Model<
  TypeCarCarModel,
  TypeCarAttributes
> {}

export type TypeCarStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): TypeCarCarModel;
};

export function TypeCarFactory(sequelize: Sequelize): TypeCarStatic {
  return <TypeCarStatic>sequelize.define(
    "typeCar",
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
      description: {
        type: DataTypes.STRING,
        allowNull: true,
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
      tableName: "typeCar",
      timestamps: false,
    }
  );
}




