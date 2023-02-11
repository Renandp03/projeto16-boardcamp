import { db } from "../config/database.js";

export async function validateGame(req,res,next){

    const { name } = req.body

    try {
        
        const gameExist = await db.query(`SELECT name FROM games WHERE name='${name}'`)

        if(gameExist) return res.status(409).send("jogo já existe")


    } catch (error) {
        res.status(500).send(error.message)
    }
    next()
}