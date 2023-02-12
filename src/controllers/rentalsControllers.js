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
                                            'game',games.name
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
        console.log(pricePerDay)

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