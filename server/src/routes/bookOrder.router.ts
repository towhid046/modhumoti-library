import express from 'express'
import { getAllBookOrderController, getBookOrderByIdController, postBookOrderController, putBookOrderByIdController } from '../controller/bookOrder.controller';

const bookOrderRouter = express.Router()

bookOrderRouter.post('/', postBookOrderController )
bookOrderRouter.get('/', getAllBookOrderController)
bookOrderRouter.get('/:id', getBookOrderByIdController)
bookOrderRouter.put('/:id', putBookOrderByIdController)
export default bookOrderRouter;

