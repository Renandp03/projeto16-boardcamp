import { db } from "../config/database.js";
import dayjs from "dayjs"

export async function getRentals(req,res){
    try {
        
        const SELECT = await db.query(`SELECT rentals.*, json_build_object(
                                                            'id',customers.id,
                                                            'name',customers.name)
                                        AS customer,
                                        json_build_object(
                                            'id',games.id,
                                            'name',games.name
                                        )
                                        AS game
                                        FROM rentals
                                        JOIN customers
                                        ON rentals."customerId" = customers.id
                                        JOIN games
                                        ON rentals."gameId"=games.id;`)

        const rentals = SELECT.rows

        res.status(200).send(rentals)

    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function postRentals(req,res){
    
    try {
        
        const { customerId, gameId, daysRented } = req.body
        const today = dayjs(new Date()).format("YYYY-MM-DD")

        const pricePerDay = await db.query(`SELECT "pricePerDay" FROM games WHERE id='${gameId}';`)

        await db.query(
            `INSERT INTO rentals 
            ("customerId","gameId","rentDate","daysRented","returnDate","originalPrice","delayFee")
            VALUES
            ($1,$2,$3,$4,$5,$6,$7)`,
            [customerId,gameId,today,daysRented,null,Number(pricePerDay.rows[0].pricePerDay)*Number(daysRented),null]
            )

            res.status(201).send("ok")

    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function postRentalsId(req,res){
    try {
        
        const { id } = req.params
        const today = dayjs(new Date()).format("YYYY-MM-DD")

        const { rows: rental } = await db.query(`SELECT * FROM rentals WHERE id = $1;`,[id])

        const pricePerDay = (rental[0].originalPrice)/(rental[0].daysRented)

        const delay = Number(dayjs(today).diff(dayjs(rental.rentDate),"day"))*Number(pricePerDay)

        await db.query(`UPDATE rentals 
                        SET "returnDate" = $1,
                        "delayFee"= $2
                        WHERE id=$3;`,[today,delay,id])

        res.status(200).send("ok")


    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function deleteRentals(req,res){

    const { id } = req.params

    try {

        await db.query(`DELETE FROM rentals WHERE id = $1;`,[id])

        res.status(200).send("Deletado com sucesso.")
        
    } catch (error) {
        res.status(500).send(error.message)
    }
}