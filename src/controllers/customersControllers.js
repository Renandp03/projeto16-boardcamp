import { db } from "../config/database.js";

export async function getCustomers(req,res){

    try {

    const SELECT = await db.query(`SELECT * FROM customers;`)
    const customers = SELECT.rows
    res.send(customers)
        
    } catch (error) {
        console.log(error.messages)
    }
}

export async function getCustomersId(req,res){

    const { id } = req.params

    try {

        const SELECT = await db.query(`SELECT * FROM customers WHERE customers.id = $1;`,[id])
        const customer = SELECT.rows[0]

        if(!customer) return res.status(422).send("Usuario não existe")

        res.send(customer)
            
        } catch (error) {
            console.log(error.messages)
        }
}

export async function postCustomers(req,res){

    const {name, phone, cpf, birthday} = req.body

    try {

        await db.query(`INSERT INTO customers (name,phone,cpf,birthday)
                        VALUES ($1,$2,$3,$4);`,[name,phone,cpf,birthday])

        res.status(201).send("ok")
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send("ERRO NO SERVIDOR")
    }
}