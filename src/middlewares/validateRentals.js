import { db } from "../config/database.js";

export async function validateRentals(req,res,next){

    const { customerId, gameId } = req.body

    try {
        
        const customerExist = await db.query(`SELECT * FROM customers WHERE customers.id=$1;`,[customerId])
        const gameExist = await db.query(`SELECT * FROM games WHERE games.id=$1;`,[gameId])

        if(!customerExist.rows[0] || !gameExist.rows[0]) return res.status(400).send("Dados inválidos")

    } catch (error) {
        res.status(500).send(error.message)
    }
    next()
}