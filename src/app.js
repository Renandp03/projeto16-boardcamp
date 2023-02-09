import express from "express"
import cors from "cors"
import gameRouter from "./routers/gameRouters.js"


const app = express()
app.use(cors())
app.use(express.json())

app.use(gameRouter)


app.listen(5000, () => console.log("rodando normalmente"))