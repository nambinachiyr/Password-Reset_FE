const express = require('express');
const authRouter = require('./routes/authRoute');
const cors = require('cors')


// origin:'http://localhost:5173',
const app = express()
app.use(cors({
    origin:'https://passwod-reset.netlify.app',
    methods:['GET','POST'],
    allowedHeaders:['Content-Type']
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/',authRouter)

module.exports = app