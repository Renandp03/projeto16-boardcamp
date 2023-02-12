import { Router } from "express";
import { getRentals,postRentals } from "../controllers/rentalsControllers.js";
import { validateSchema } from "../middlewares/validateSchema.js"
import { rentalSchema } from "../schemas/rentalSchema.js";


const rentalRouter = Router()

rentalRouter.get("/rentals",getRentals)
rentalRouter.post("/rentals",validateSchema(rentalSchema),postRentals)


export default rentalRouter