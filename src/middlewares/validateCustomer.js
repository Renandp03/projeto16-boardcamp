import { db } from "../config/database.js";

export async function validateCustomer(req,res,next){

    const { id } = req.params
    const { cpf } = req.body

    try {
        
        const cpfExist = await db.query(`SELECT * FROM customers WHERE cpf='${cpf}';`)

        if(!id && cpfExist) return res.status(409).send("dados inválidos")

        if(cpfExist.rows[0] && cpfExist.rows[0].id !== Number(id) ) return res.status(409).send("Existe um usuário com este cpf cadastrado")


    } catch (error) {
        res.status(500).send("ERRO NO SERVIDOR")
    }
    next()
}