import express from "express";
import routes from "./routes/index.js";
import rbmqServer from "./services/amqplib.js";

export async function start() {
  const app = express();
  await rbmqServer.start();

  rbmqServer.consume("message_test", (msg) => {
    console.log("content:", msg.content.toString());
  });

  app.use(routes);

  return app;
}
