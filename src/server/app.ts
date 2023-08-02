import express from "express";
import cors from "cors";
import morgan from "morgan";
import { paths } from "./paths/paths.js";
import { pingController } from "./controllers/pingController/pingController.js";
import {
  generalError,
  notFoundError,
} from "./middlewares/errorMiddlewares/errorMiddlewares.js";
import userRouter from "./routers/users/userRouter.js";

export const app = express();

const allowedOrigins = [process.env.ALLOWED_ORIGIN_DEV!];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));
app.use(express.json());

app.use(morgan("dev"));
app.disable("x-powered-by");

app.get(paths.ping, pingController);

app.use(paths.user, userRouter);

app.use(notFoundError);

app.use(generalError);
