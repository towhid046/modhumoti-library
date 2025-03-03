import express from 'express'
import { getAllBookOrderController, getBookOrderByIdController, postBookOrderController } from '../controller/bookOrder.controller';

const bookOrderRouter = express.Router()

bookOrderRouter.post('/', postBookOrderController )
bookOrderRouter.get('/', getAllBookOrderController)
bookOrderRouter.get('/:id', getBookOrderByIdController)
export default bookOrderRouter;

