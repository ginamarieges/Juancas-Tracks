import { Router } from "express";
import { paths } from "../../paths/paths.js";
import { getTracks } from "../../controllers/tracksControllers/tracksControllers.js";

const tracksRouter = Router();

tracksRouter.get(paths.root, getTracks);

export default tracksRouter;
