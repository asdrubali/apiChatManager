import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface CompanyAttributes {
  id: number;
  ruc: string;
  business_name: string;
  description: string;

  is_deleted?: boolean;
  created_date?: Date;
  created_by?: number;
  updated_date?: Date;
  updated_by?: number;
}

export interface CompanyPartialAttributes extends Partial<CompanyAttributes> {}

export interface CompanyModel
  extends Model<CompanyAttributes>,
    CompanyAttributes {}

export class Company extends Model<CompanyAttributes, CompanyModel> {}

export type CompanyStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): CompanyModel;
};

export function CompanyFactory(sequelize: Sequelize): CompanyStatic {
  return <CompanyStatic>sequelize.define(
    "company",
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      ruc: {
        type: DataTypes.STRING(11),
        allowNull: false,
        unique: true,
      },
      business_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
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
      tableName: "company",
      timestamps: false,
    }
  );
}
