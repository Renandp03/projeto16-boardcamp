import { Router } from "express";

const gameRouter = Router()

gameRouter.get("/games",() => console.log("deu um get aqui"))


export default gameRouter