import { config } from "@users/config";
import { Logger } from "winston";
import { winstonLogger } from "@juandavid9909/jobber-shared";
import mongoose from "mongoose";

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, "usersDatabase", "debug");

const databaseConnection = async (): Promise<void> => {
  try {
    await mongoose.connect(`${config.DATABASE_URL}`);

    log.info("Users service successfully connected to database.");
  } catch (error) {
    log.log("error", "UsersService databaseConnection() method error:", error);
  }
};

export { databaseConnection };
