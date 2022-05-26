import { Router } from "express";
import rbmq from "../services/amqplib.js";

const routes = Router();

routes.get("/", async (req, res) => {
  const newProductDetails = {
    id: Math.round(Math.random() * 100),
    name: "Hamburguer",
    price: 10,
  };

  rbmq.publish("new-products", JSON.stringify(newProductDetails));

  return res.sendStatus(200);
});

export default routes;
