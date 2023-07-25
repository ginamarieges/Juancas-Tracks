import "./loadEnvironment.js";
import createDebug from "debug";
import { app } from "./server/app.js";

const debug = createDebug("juancas-tracks-api:root");

const port = process.env.PORT ?? 4000;

app.listen(port, () => {
  debug(`Listening to port ${port}`);
});
