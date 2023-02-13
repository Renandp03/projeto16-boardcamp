import { Router } from "express";
import { getRentals,postRentals,postRentalsId } from "../controllers/rentalsControllers.js";
import { validateSchema } from "../middlewares/validateSchema.js"
import { validateRentals } from "../middlewares/validateRentals.js";
import { validateFinalRentals} from "../middlewares/validateFinalRentals.js"
import { rentalSchema } from "../schemas/rentalSchema.js";


const rentalRouter = Router()

rentalRouter.get("/rentals",getRentals)
rentalRouter.post("/rentals",validateSchema(rentalSchema),validateRentals,postRentals)
rentalRouter.post("/rentals/:id/return",validateFinalRentals,postRentalsId)


export default rentalRouter