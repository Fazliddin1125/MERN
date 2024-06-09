const express = require('express')
const router = express.Router()
const AuthController = require("../controllers/auth.controller")
const {body} = require("express-validator")
const authMiddleware = require('../middlewares/auth.middleware')

router.post(
    "/register",
    body("email").isEmail(),
    body("password").isLength({min: 4, max: 30}),
    AuthController.register
)
router.post(
    "/login",
    body("email").isEmail(),
    body("password").isLength({min: 4, max: 30}),
     AuthController.login)
router.post("/logout", AuthController.logout)
router.get('/activation/:id', AuthController.activation)
router.get('/refresh', AuthController.refresh)
router.get('/get-users', authMiddleware ,AuthController.getusers)
module.exports = router



