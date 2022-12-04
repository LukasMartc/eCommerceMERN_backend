import express from "express";
import {
    register,
    registerAdmin,
    authenticate,
    confirmed,
    forgetPassword,
    checkToken,
    newPassword,
    profile
} from "../controllers/userController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

// Autenticación, Registro y Confirmación de usuarios
router.post('/', register);
router.post('/login', authenticate);
router.get('/confirmed/:token', confirmed);
router.post('/forget-password', forgetPassword);
router.route('/forget-password/:token')
    .get(checkToken)
    .post(newPassword)
router.route('/profile')
    .get(checkAuth, profile)
    .post(checkAuth, registerAdmin)

export default router;