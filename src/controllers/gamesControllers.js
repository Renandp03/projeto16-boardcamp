import { db } from "../config/database.js"

export async function getGames(req,res){
    try {

        const select = await db.query("SELECT * FROM games;")
        const games = select.rows
        res.send(games)
        
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function postGames(req,res){

    try {

        const {name, image, stockTotal, pricePerDay} = req.body

        await db.query(
            `INSERT INTO games (name,image,"stockTotal","pricePerDay")
             VALUES ($1,$2,$3,$4);`,
             [name,image,Number(stockTotal),Number(pricePerDay)])

        res.status(201).send("ok")

    } catch (error) {

        res.status(500).send(error.message)

    }

}