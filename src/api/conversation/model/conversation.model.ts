import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface ConversationAttributes {
  id: number;
  type: string,
  unread: boolean,
  draftMessage: string,
  user_id: number,
  contacts: number[],

//   date:Date;
  is_deleted?: boolean;
  created_date?: Date;
  created_by?: number;
  updated_date?: Date;
  updated_by?: number;
}

export interface ConversationPartialAttributes extends Partial<ConversationAttributes> {}

export interface ConversationModel
  extends Model<ConversationAttributes>,
    ConversationAttributes {}

export class Conversation extends Model<ConversationAttributes, ConversationModel> {}

export type ConversationStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ConversationModel;
};

export function ConversationFactory(sequelize: Sequelize): ConversationStatic {
  return <ConversationStatic>sequelize.define(
    "conversation",
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
        type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      unread: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      draftMessage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      contacts: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: [],
        allowNull: false,
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
      tableName: "conversation",
      timestamps: false,
    }
  );
}
