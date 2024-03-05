import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface MessageAttributes {
  id: number;
  content: string;
  isRead: boolean;
  date: string; 
  sender_id: number;
  contact_id: number;
  conversation_id: number;
  sender_user_id: number;

//   date:Date;
  is_deleted?: boolean;
  created_date?: Date;
  created_by?: number;
  updated_date?: Date;
  updated_by?: number;
}

export interface MessagePartialAttributes extends Partial<MessageAttributes> {}

export interface MessageModel
  extends Model<MessageAttributes>,
    MessageAttributes {}

export class Message extends Model<MessageAttributes, MessageModel> {}

export type MessageStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): MessageModel;
};

export function MessageFactory(sequelize: Sequelize): MessageStatic {
  return <MessageStatic>sequelize.define(
    "message",
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
        content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      conversation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      contact_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sender_user_id: {
        type: DataTypes.STRING,
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
      tableName: "message",
      timestamps: false,
    }
  );
}
