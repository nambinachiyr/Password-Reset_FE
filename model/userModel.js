const mongoose = require('mongoose')

const user_schema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        required:true
    },
    password:String,
    randomString:{
        type:String
    },
    randomStringExpiry:Date

})
 module.exports = mongoose.model('User',user_schema,'users')