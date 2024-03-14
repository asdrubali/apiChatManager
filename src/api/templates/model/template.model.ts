import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface templateAttributes {
  id: number;

  title: string;
  subtitle: string;
  tech: string;
  description: string;
  image: string;
  review: string[];
  
  is_active: boolean;
  created_at?: Date | null;
  created_by?: number | null;
  updated_at?: Date | null;
  updated_by?: number | null;
}



export interface TemplatePartialAttributes
  extends Partial<templateAttributes> {}

export interface TemplateModel
  extends Model<templateAttributes>,
    templateAttributes {}
export class Template extends Model<
  TemplateModel,
  templateAttributes
> {}

export type templateStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): TemplateModel;
};

export function templateFactory(sequelize: Sequelize): templateStatic {
  return <templateStatic>sequelize.define(
    "template",
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },


      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subtitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tech: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      review: {
        type: DataTypes.ARRAY(DataTypes.STRING),
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
      tableName: "template",
      timestamps: false,
    }
  );
}




