import { Router } from "express";
import { getGames, postGames } from "../controllers/gamesControllers.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { gameSchema } from "../schemas/gameSchema.js";

const gamesRouter = Router()

gamesRouter.get("/games",getGames)

gamesRouter.post("/games",validateSchema(gameSchema),postGames)


export default gamesRouter