import { db } from "../config/database.js";

export async function validateRentals(req,res,next){

    const { customerId, gameId } = req.body

    try {
        
        const customer = await db.query(`SELECT name FROM customers WHERE id=$1;`,[customerId])
        const game = await db.query(`SELECT * FROM games WHERE id=$1;`,[gameId])

        if(!customer.rows[0] || !game.rows[0]) return res.status(400).send("Dados inválidos")

        const stock = await db.query(`SELECT * FROM rentals WHERE "gameId"=$1;`,[gameId])

        if(stock.rows.length >= game.rows[0].stockTotal) return res.status(400).send("jogo indisponível")


    } catch (error) {
        res.status(500).send(error.message)
    }
    next()
}