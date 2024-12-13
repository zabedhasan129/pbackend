const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({
    username:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    otp:{
        type: String
    },
    role:{
        type:String,
        role:["user","marchant","admin"],
        default: "user"
    }
    
})

const User = mongoose.model('User',userSchema);

module.exports = User;