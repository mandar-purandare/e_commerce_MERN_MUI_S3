import { Router } from "express";
import { GetCurrentUser, Login, Register, UpdateUser } from "../controllers/authControllers.js";

const router = Router()

router.post('/register', Register)
router.post('/login', Login)
router.get('/get-current-user', GetCurrentUser)
router.post('/edit-user', UpdateUser)

export default router