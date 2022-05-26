import express from "express";
import routes from "./routes/index.js";
import RBMQServer from "./services/amqplib.js";

export async function start() {
  const app = express();
  await RBMQServer.start();
  app.use(routes);
  return app;
}
