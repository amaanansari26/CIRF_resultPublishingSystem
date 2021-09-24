const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const batchSchema= new Schema({
    year:{
        type:String,
        required: true
    },
    sem:{
        type:String,
        required:true
    }

})

module.exports = mongoose.model('batch', batchSchema);