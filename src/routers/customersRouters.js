import { Router } from "express";
import { getCustomers,getCustomersId, postCustomers} from "../controllers/customersControllers.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { customerSchema } from "../schemas/customerSchema.js"

const customersRouter = Router()

customersRouter.get("/customers",getCustomers)
customersRouter.get("/customers/:id",getCustomersId)
customersRouter.post("/customers",validateSchema(customerSchema),postCustomers)



export default customersRouter