import { config } from "config";
import { Sequelize } from "npm:sequelize-typescript";
import "npm:pg";
import "npm:pg-hstore";
import { User } from "./User.ts";
import { Category } from "./Category.ts";

const {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
} = config();

export class Database {
  private sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize({
      database: DATABASE_NAME,
      dialect: "postgres",
      host: DATABASE_HOST,
      password: DATABASE_PASSWORD,
      username: DATABASE_USER,
    });
  }

  public async close() {
    await this.sequelize.close();
  }

  public async addModels() {
    await this.sequelize.addModels([User, Category]);
  }

  public async connect() {
    try {
      await this.sequelize.authenticate();
      await this.sequelize.sync({
        force: false,
      });

      console.log("Connection has been established successfuly");
    } catch (error) {
      console.error("Unable to connect to the database", error);
    }
  }
}
