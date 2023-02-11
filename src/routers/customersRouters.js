import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { validateCustomer } from "../middlewares/validateCustomer.js";
import { customerSchema } from "../schemas/customerSchema.js"

import { getCustomers,
    getCustomersId, 
    postCustomers, 
    putCustomers} from "../controllers/customersControllers.js";
    
const customersRouter = Router()

customersRouter.get("/customers",getCustomers)
customersRouter.get("/customers/:id",getCustomersId)
customersRouter.post("/customers",validateSchema(customerSchema),validateCustomer,postCustomers)
customersRouter.put("/customers/:id",validateSchema(customerSchema),validateCustomer,putCustomers)


export default customersRouter