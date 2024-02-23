import mongoose from "mongoose";
import { logger } from "../utils/logger";

(async function () {
  mongoose.connection.on("connected", () => {
    logger.info("Mongoose connected to db");
  });

  mongoose.connection.on("error", (err) => {
    logger.error(err.message);
  });

  mongoose.connection.on("disconnected", () => {
    logger.info("Mongoose connection is disconnected");
  });

  // attaching the listeners first to prevent the connection code to run before
  // the listeners are attached and running effectively
  try {
    await mongoose.connect("mongodb://localhost:27017/pmessaging");
    logger.info("MongoDB is connected");
  } catch (err) {
    logger.error((err as Error).message);
  }

  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
})();
