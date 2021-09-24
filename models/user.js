const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const userSchema= new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    rollno:{
        type:Number,
    },
    currentBatch:{
        type :Schema.Types.ObjectId,
        ref:'batch'
    },
    profile:{
        type:String,
        default:'/images/default.png'
    },
    address:{
        type:String
    }

})


module.exports = mongoose.model('user', userSchema);