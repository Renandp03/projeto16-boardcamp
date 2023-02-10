import express from "express"
import cors from "cors"
import gamesRouter from "./routers/gamesRouters.js"
import customersRouter from "./routers/customersRouters.js"


const app = express()
app.use(cors())
app.use(express.json())

app.use([gamesRouter,customersRouter])


app.listen(5000, () => console.log("rodando normalmente"))