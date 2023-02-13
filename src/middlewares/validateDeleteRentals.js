import { db } from "../config/database.js";

export async function validateDeleteRentals(req,res,next){

    const { id } = req.params

    try {
        
        const { rows:rental } = await db.query(`SELECT * FROM rentals WHERE id = $1`,[id])

        if(!rental[0]) return res.status(404).send("aluguel não encontrado.")

        if(rental[0].returnDate === null) return res.status(400).send("Esse aluguel ainda não foi finalizado")

    } catch (error) {
        res.status(500).send(error.message)
    }
    next()
}