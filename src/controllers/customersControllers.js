import { db } from "../config/database.js";

export async function getCustomers(req,res){

    try {

    const SELECT = await db.query(`SELECT * FROM customers;`)
    const customers = SELECT.rows
    res.send(customers)
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send("ERRO NO SERVIDOR")
    }
}

export async function getCustomersId(req,res){

    const { id } = req.params

    try {

        const SELECT = await db.query(`SELECT * FROM customers WHERE customers.id = $1;`,[id])
        const customer = SELECT.rows[0]

        if(!customer) return res.status(404).send("Usuario não existe")

        res.send(customer)
            
        } catch (error) {
            console.log(error.message)
            res.status(500).send("ERRO NO SERVIDOR")
        }
}

export async function postCustomers(req,res){

    try {

        const {name, phone, cpf, birthday} = req.body

        await db.query(`INSERT INTO customers (name,phone,cpf,birthday)
                        VALUES ($1,$2,$3,$4);`,[name,phone,cpf,birthday])

        res.status(201).send("ok")
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send("ERRO NO SERVIDOR")
    }
}

export async function putCustomers(req,res){

    try {
        const { id } = req.params
        const {name, phone, cpf, birthday} = req.body
    
        await db.query(`UPDATE customers
                        SET name=$1,phone=$2,cpf=$3,birthday=$4
                        WHERE customers.id = '${id}';`,
                        [name,phone,cpf,birthday])

        res.status(200).send("ok")
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send("ERRO NO SERVIDOR")
    }
}