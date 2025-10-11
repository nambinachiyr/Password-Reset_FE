const express = require('express')
const { GetEmail, logIn_Create, newPassword, CreateUser } = require('../controllers/authController')

const authRouter = express.Router()

authRouter.post('/password_reset',GetEmail)

authRouter.post('/login',logIn_Create)

authRouter.post('/newpassword',newPassword)

authRouter.post('/createaccount',CreateUser)
module.exports = authRouter
