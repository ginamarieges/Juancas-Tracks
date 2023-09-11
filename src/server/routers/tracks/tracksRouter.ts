import { Router } from "express";
import { paths } from "../../paths/paths";
import { getTracks } from "../../controllers/tracksControllers/tracksControllers";

const tracksRouter = Router();

tracksRouter.get(paths.tracks, getTracks);

export default tracksRouter;
