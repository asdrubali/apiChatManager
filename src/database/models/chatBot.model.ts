import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface ChatBotAttributes {
  id: number;

  user_id: number;
  tech: string;
  template: string;
  token_id: number;

  status: boolean;
  created_at?: Date | null;
  created_by?: number | null;
  updated_at?: Date | null;
  updated_by?: number | null;
}

export interface ChatBotPartialAttributes
  extends Partial<ChatBotAttributes> {}

export interface ChatBotModel
  extends Model<ChatBotAttributes>,
    ChatBotAttributes {}
export class client extends Model<
  ChatBotModel,
  ChatBotAttributes
> {}

export type ChatBotStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ChatBotModel;
};

export function ChatBotFactory(sequelize: Sequelize): ChatBotStatic {
  return <ChatBotStatic>sequelize.define(
    "chatBot",
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
      tech: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      template: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      token_id: {
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
      tableName: "chatBot",
      timestamps: false,
    }
  );
}




