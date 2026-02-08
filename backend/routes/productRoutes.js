import { Router } from "express";
import { AddProduct, AddToCart, deleteProduct, GetAllProducts, getPageResults, ViewProduct } from "../controllers/productControllers.js";
// import {upload, uploadToS3} from "../middlewares/uploadImageS3.middleware.js";
import {upload, uploadToImageKit, deleteFromImageKit} from "../middlewares/uploadToImageKit.middleware.js";



const router = Router()

router.post('/add-product', upload.single('imageUrl'), uploadToImageKit, AddProduct);
router.post('/add-to-cart', AddToCart)
router.get('/get-all-products', GetAllProducts)
router.get('/view-product', ViewProduct)
router.get('/get-page-results', getPageResults)
router.delete('/delete-product/:id/:imageKitFileId', deleteFromImageKit ,deleteProduct)

export default router
