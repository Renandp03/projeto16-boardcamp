import { Router } from "express";
import { getGames, postGames } from "../controllers/gamesControllers.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { validateGame } from "../middlewares/validateGame.js";
import { gameSchema } from "../schemas/gameSchema.js";

const gamesRouter = Router()

gamesRouter.get("/games",getGames)

gamesRouter.post("/games",validateSchema(gameSchema),validateGame,postGames)


export default gamesRouter