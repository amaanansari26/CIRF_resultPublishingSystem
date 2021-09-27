const results = require('../../resultPublish/models/results');


const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const Result = require('../models/result'),
    errh = (err) => {
        console.log(err)
    }

const subjectSchema = new Schema({
    scode: {
        type: String,
        required: true
    },
    sname: {
        type: String,
        required: true
    },
    faculty: {
        type: String,
        
    },
    year:{
        type:Number,
        required: true
    },
    sem:{
        type:Number,
        required:true
    }


})
subjectSchema.methods.getResults = function (cb) {
    Result.find({
        subject: this._id
    }).then(results => {
        return cb(results)
    }).catch(errh)
}

subjectSchema.methods.addModifyResult = function (rollno,om,tm,cb){
    const User=require('../models/user')
    if(!rollno && !om && !tm){return cb(null,'missing values')}
    User.findOne({'rollno':rollno}).then(user=>{
        if(!user){return cb(null,'invaild rollno')}
        Result.remove({'rollno':rollno,'subject':this}).then(r=>{
            const result = new Result({
                "rollno":user.rollno,
                "subject":this,
                "om":om,
                "tm":tm
            })
            result.save().then(result=>{
                return cb(result)
            }).catch(errh)
        }).catch(errh)
    }).catch()

}
subjectSchema.methods.removethis=function(cb){
    
    Result.deleteMany({'subject':this}).then(r=>{
        console.log(r)
        this.remove().then(s=>{
            return cb(s)
        }).catch(errh)
    }).catch(errh)
}
//  subjectSchema.methods.uploadResults=function(file,cb){
     
//      const finalArray=[]
//     csv.csvtoarray(file,(results=>{
//         if(results[0].scode!=this.scode){return cb(null,'subject do no match')}
//         results.forEach(result=>{
//             finalArray.push({"subject":this,"rollno":result.rollno,"om":result.om,"tm":result.tm})


//         })
//         console.log(finalArray)
        
//         Result.insertMany(finalArray).then(results=>{
//             return cb(results)
//         }).catch(errh)

//     }))
    

//  }
 

module.exports = mongoose.model('subject', subjectSchema);