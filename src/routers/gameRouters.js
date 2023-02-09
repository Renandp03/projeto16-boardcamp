import { Router } from "express";
import { getGames, postGames } from "../controllers/gameControllers.js";
import { validateGame } from "../middlewares/validateGame.js";
import { gameSchema } from "../schemas/gameSchema.js";

const gameRouter = Router()

gameRouter.get("/games",getGames)

gameRouter.post("/games",validateGame(gameSchema),postGames)


export default gameRouter