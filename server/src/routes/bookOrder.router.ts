import express from 'express'
import { getAllBookOrderController, postBookOrderController } from '../controller/bookOrder.controller';

const bookOrderRouter = express.Router()

bookOrderRouter.post('/', postBookOrderController )
bookOrderRouter.get('/', getAllBookOrderController)
export default bookOrderRouter;

