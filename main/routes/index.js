import { Router } from "express";

const routes = Router();

routes.get("/", (req, res) => {
  return res.sendStatus(200);
});

export default routes;
