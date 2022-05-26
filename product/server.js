import { start } from "./app.js";

start().then((app) => {
  const PORT = process.env.PORT || 3032;
  app.listen(PORT, () => console.log("Running at port", PORT));
});
