const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },

    username:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
   
    date:{
        type:Date,
        default:Date.now
    }
});

const Users = mongoose.model('users' , UserSchema);
module.exports = Users;