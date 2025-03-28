import express, { Router } from "express";
import AuthRoutes from './authRoutes.js'
import ProductRoutes from './productRoutes.js'

const router = Router()

router.use(express.json({ limit: "10mb" }));
router.use(express.urlencoded({ extended: true }));

router.use("/auth", AuthRoutes);
router.use("/products", ProductRoutes);

export default router