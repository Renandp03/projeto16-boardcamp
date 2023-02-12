import { Router } from "express";
import { getRentals,postRentals } from "../controllers/rentalsControllers.js";
import { validateSchema } from "../middlewares/validateSchema.js"
import { validateRentals } from "../middlewares/validateRentals.js";
import { rentalSchema } from "../schemas/rentalSchema.js";


const rentalRouter = Router()

rentalRouter.get("/rentals",getRentals)
rentalRouter.post("/rentals",validateSchema(rentalSchema),validateRentals,postRentals)


export default rentalRouter