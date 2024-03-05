import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface clientAttributes {
  id: number;
  phone: string;
  name: string;
  last_name: string;

  created_at?: Date | null;
  created_by?: number | null;
  updated_at?: Date | null;
  updated_by?: number | null;
}

export interface clientPartialAttributes
  extends Partial<clientAttributes> {}

export interface clientModel
  extends Model<clientAttributes>,
    clientAttributes {}
export class client extends Model<
  clientModel,
  clientAttributes
> {}

export type clientStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): clientModel;
};

export function clientFactory(sequelize: Sequelize): clientStatic {
  return <clientStatic>sequelize.define(
    "client",
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      user_id: {
        type: DataTypes.BIGINT,
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
      tableName: "client",
      timestamps: false,
    }
  );
}




