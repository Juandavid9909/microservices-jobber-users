import { config } from "@users/config";
import { databaseConnection } from "@users/database";

const initialize = (): void => {
  config.cloudinaryConfig();

  databaseConnection();
};

initialize();
