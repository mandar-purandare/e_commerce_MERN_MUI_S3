import { Router } from "express";
import { AddProduct, GetAllProducts, getPageResults, ViewProduct } from "../controllers/productControllers.js";
import {upload, uploadToS3} from "../middlewares/uploadImageS3.middleware.js";



const router = Router()

router.post('/add-product', upload.single('imageUrl'), uploadToS3, AddProduct);
router.get('/get-all-products', GetAllProducts)
router.get('/view-product', ViewProduct)
router.get('/get-page-results', getPageResults)

export default router
