const app = require("./app")
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGO_DB)
.then(()=>{
    console.log("Mongo DB is Connected")

    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port -> http://localhost:${process.env.PORT}`)
    })
})
.catch(()=>{
    console.log("Error to Connect")
})

