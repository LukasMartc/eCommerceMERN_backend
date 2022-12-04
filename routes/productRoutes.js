import express from 'express';
import {
    createProduct,
    getProducts,
    getProduct,
    editProduct,
    deleteProduct
} from '../controllers/productController.js';
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route('/')
    .get(getProducts)
    .post(checkAuth, createProduct);

router.route('/:id')
    .get(getProduct)
    .put(checkAuth, editProduct)
    .delete(checkAuth, deleteProduct)


export default router;