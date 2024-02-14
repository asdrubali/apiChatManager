import { BuildOptions, DataTypes, Model, Optional, Sequelize } from "sequelize";
import { LoginStatusTypes } from "../types/loginStatus.type";
import { USER_DEFAULT_VALUES } from "../constants/defaultValues";
import { GenderTypes } from "../types/gender.type";

export interface UserAttributes {
  id: number;

  name: string;
  last_name: string;
  user_type?: string;
  username?: string;
  email: string;
  password: string;


  salt: string;
  status: boolean;

  // Estado del login
  login_status: LoginStatusTypes;
  failed_attempts: number;
  last_lock_date?: Date | null;
  last_unlock_date?: Date | null;
  lockout_minutes?: number | null;

  // Codigos adicionales
  recovery_code?: string | null;

  tenant?: number | null;

  is_deleted: boolean;
  created_date: Date;
  created_by?: number | null;
  updated_date?: Date | null;
  updated_by?: number | null;
}

export interface UserPartialAttributes extends Partial<UserAttributes> {}

export interface UserModel extends Model<UserAttributes>, UserAttributes {}

export interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    | "id"
    | "last_lock_date"
    | "last_unlock_date"
    | "lockout_minutes"
    | "status"
  > {}

export class User extends Model<UserCreationAttributes, UserModel> {}

export type UserStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserModel;
};

export function UserFactory(sequelize: Sequelize): UserStatic {
  return <UserStatic>sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      username: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: true,
      },
      email: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      document_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      document_number: {
        type: DataTypes.STRING,
        allowNull: true,
        // unique: true,
      },
      salt: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      login_status: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: USER_DEFAULT_VALUES.LOGIN_STATUS,
      },

      failed_attempts: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: USER_DEFAULT_VALUES.FAILED_ATTEMPTS,
      },

      last_lock_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      last_unlock_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      lockout_minutes: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      device_id: {
        type: DataTypes.STRING(1000),
        allowNull: true,
      },

      recovery_code: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },

      tenant: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },

      is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      created_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      created_date: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn("NOW"),
        allowNull: false,
      },
      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      updated_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      initialAutoIncrement: "1",
      tableName: "user",
      timestamps: false,
    }
  );
}
