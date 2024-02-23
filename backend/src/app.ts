import express, { Request, Response, NextFunction, Express } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import createError from "http-errors";
import cors from "cors";
import { IErrorMessage } from "./utils/interfaces";
import authRoute from "./routes/user.routes";
import "./db/initmongodb";
import { logger } from "./utils/logger";

const app: Express = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use("/auth", authRoute);

app.get(
  "/",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.send("Hello World");
  }
);

// test - route
app.get("/error", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    throw createError(400, "This is a custom error");
  } catch (e) {
    next(e);
  }
});

app.all(
  "*",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    next(createError(404, "Resource Not Found"));
  }
);

app.use(
  async (
    err: createError.HttpError,
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    
    const error: IErrorMessage = {
      status: err.status || 500,
      message: err.message || "Internal Server Error",
    };

    logger.error(err)
    res.status(err.status || 500).send({ error });
  }
);

export default app;
