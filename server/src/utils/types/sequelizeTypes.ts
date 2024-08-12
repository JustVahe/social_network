import { DataTypes } from "sequelize";
import { Dialect } from "sequelize";
import { config as dotenvConfig } from "dotenv";
dotenvConfig();

export type DataTypesInterface = typeof DataTypes;

export interface IEnvConfig {
  username: string,
  password: string | null | undefined,
  database: string,
  host: string,
  logging?: boolean,
  dialect: Dialect,
  use_env_variable?: string
}

export interface ConfigTypes {
  [key: string]: IEnvConfig
}