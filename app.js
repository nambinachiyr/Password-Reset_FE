const express = require('express');
const authRouter = require('./routes/authRoute');
const cors = require('cors')


const app = express()
app.use(cors({
    origin:'https://password-reset-projec.netlify.app',
    methods:['GET','POST'],
    allowedHeaders:['Content-Type']
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/api',authRouter)

module.exports = app