import { Sequelize, DataTypes, Model, BuildOptions } from "sequelize";

type modelType = typeof Model;

interface sequelizeConstructor<T> {
  new (values?: object, options?: BuildOptions): T;
}

export interface TestAttribute {
  id: number;
  email: string;
}

export interface TestModel extends Model, TestAttribute {}

export type TestInstance = modelType &
  sequelizeConstructor<TestModel> &
  TestAttribute;

export default (sequelize: Sequelize): TestInstance => {
  return <TestInstance>sequelize.define(
    "test",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "test",
    }
  );
};
