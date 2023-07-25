import express from "express";
import cors from "cors";
import morgan from "morgan";

export const app = express();

const allowedOrigins = [process.env.ALLOWED_ORIGIN_DEV!];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));
app.use(express.json());

app.use(morgan("dev"));
app.disable("x-powered-by");
