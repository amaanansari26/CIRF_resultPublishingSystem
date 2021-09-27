const mongoose = require('mongoose'),
    

    Schema = mongoose.Schema;

const resultSchema= new Schema({
   rollno:{
        type:Number,
        required:true
    },
    subject:{
        type:Schema.Types.ObjectId,
        ref:'subject',
        required:true
    },
    om:{
        type:Number,
        required:true
    },
    tm:{
        type:Number,
        required:true
    }

})



module.exports = mongoose.model('result', resultSchema);