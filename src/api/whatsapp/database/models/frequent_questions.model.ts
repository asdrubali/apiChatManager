import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface FrequentQuestionsAttributes {
  id: number;

  owner_id: Number;
  name: string;
  question: string;
  response: string;

  created_at?: Date | null;
  created_by?: number | null;
  updated_at?: Date | null;
  updated_by?: number | null;
}



export interface FrequentQuestionsPartialAttributes
  extends Partial<FrequentQuestionsAttributes> {}

export interface FrequenTQuestionsModel
  extends Model<FrequentQuestionsAttributes>,
    FrequentQuestionsAttributes {}
export class FrequenTQuestions extends Model<
  FrequenTQuestionsModel,
  FrequentQuestionsAttributes
> {}

export type FrequenTQuestionsStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): FrequenTQuestionsModel;
};

export function FrequenTQuestionsFactory(sequelize: Sequelize): FrequenTQuestionsStatic {
  return <FrequenTQuestionsStatic>sequelize.define(
    "frequentQuestions",
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      template_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      question: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      response: {
        type: DataTypes.TEXT,
        allowNull: false,
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
      tableName: "frequentQuestions",
      timestamps: false,
    }
  );
}




