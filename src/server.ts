import http from "http";

import { Application, json, NextFunction, Request, Response, urlencoded } from "express";
import { appRoutes } from "@users/routes";
import { checkConnection } from "@users/elasticsearch";
import { config } from "@users/config";
// import { createConnection } from "@users/queues/connection";
import { CustomError, IAuthPayload, IErrorResponse, winstonLogger } from "@juandavid9909/jobber-shared";
import { Logger } from "winston";
import { verify } from "jsonwebtoken";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";

const SERVER_PORT = 4003;

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, "usersServer", "debug");

export const start = (app: Application): void => {
  securityMiddleware(app);
  standardMiddleware(app);
  routesMiddleware(app);
  startQueues();
  startElasticSearch();
  usersErrorHandler(app);
  startServer(app);
};

const securityMiddleware = (app: Application): void => {
  app.set("trust proxy", 1);

  app.use(hpp());
  app.use(helmet());
  app.use(
    cors({
      origin: config.API_GATEWAY_URL,
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    })
  );

  app.use((req: Request, _res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const payload: IAuthPayload = verify(token, config.JWT_TOKEN!) as IAuthPayload;

      req.currentUser = payload;
    }

    next();
  });
};

const standardMiddleware = (app: Application): void => {
  app.use(compression());
  app.use(json({ limit: "200mb" }));
  app.use(urlencoded({ extended: true, limit: "200mb" }));
};

const routesMiddleware = (app: Application): void => {
  appRoutes(app);
};

const startQueues = async (): Promise<void> => {};

const startElasticSearch = (): void => {
  checkConnection();
};

const usersErrorHandler = (app: Application): void => {
  app.use((error: IErrorResponse, _req: Request, res: Response, next: NextFunction) => {
    log.log("error", `UsersService ${error.comingFrom}:`, error);

    if (error instanceof CustomError) {
      res.status(error.statusCode).json(error.serializeErrors());
    }

    next();
  });
};

const startServer = (app: Application): void => {
  try {
    const httpServer: http.Server = new http.Server(app);

    log.info(`Users server has started with process id ${process.pid}`);

    httpServer.listen(SERVER_PORT, () => {
      log.info(`Users server running on port ${SERVER_PORT}`);
    });
  } catch (error) {
    log.log("error", "UsersService startServer() method error:", error);
  }
};
