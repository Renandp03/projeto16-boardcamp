import { db } from "../config/database.js";

export async function validateGame(req,res,next){

    const { name } = req.body

    try {
        
        const gameExist = await db.query(`SELECT * FROM games WHERE name = '${name}';`)

        console.log(gameExist.rows)

        if(gameExist.rows[0]) return res.status(409).send("jogo já existe")


    } catch (error) {
        res.status(500).send(error.message)
    }
    next()
}