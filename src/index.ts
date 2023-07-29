import "./loadEnvironment.js";
import createDebug from "debug";
import { app } from "./server/app.js";
import connectToDatabase from "./database/connectToDatabase.js";

const debug = createDebug("juancas-tracks-api:root");

const port = process.env.PORT ?? 4000;
const mongodbConnect = process.env.MONGODB_CONNECTION;

if (!mongodbConnect) {
  debug("Missing environment variables");
  process.exit(1);
}

app.listen(port, () => {
  debug(`Listening to port ${port}`);
});

try {
  await connectToDatabase(mongodbConnect);
  debug("Connected to database");
} catch (error) {
  debug(`Error connecting to database: ${(error as Error).message}`);
}
