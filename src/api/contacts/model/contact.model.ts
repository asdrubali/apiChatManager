import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface ContactAttributes {
  id: number;
  name: string;
  last_name: string;
  phone: string;
  user_id: number;

  is_deleted?: boolean;
  created_date?: Date;
  created_by?: number;
  updated_date?: Date;
  updated_by?: number;
}

export interface ContactPartialAttributes extends Partial<ContactAttributes> {}

export interface ContactModel
  extends Model<ContactAttributes>,
    ContactAttributes {}

export class Contact extends Model<ContactAttributes, ContactModel> {}

export type ContactStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ContactModel;
};

export function ContactFactory(sequelize: Sequelize): ContactStatic {
  return <ContactStatic>sequelize.define(
    "contact",
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

      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      created_date: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn("NOW"),
        allowNull: false,
      },
      created_by: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      updated_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updated_by: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
    },
    {
      initialAutoIncrement: "1",
      tableName: "contact",
      timestamps: false,
    }
  );
}
