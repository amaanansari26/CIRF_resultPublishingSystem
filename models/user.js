const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const Result = require('./result'),
    Subject = require('./subject'),
    errh = (err) => {
        console.log(err)
    }

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name:{
        type: String, //stu/fc/hod
        required: true
    },
    type: {
        type: String, //stu/fc/hod
        required: true
    },
    rollno: {
        type: Number,
    },
    year:{
        type:Number,
        required: true
    },
    profile: {
        type: String,
        default: '/images/default.jpg'
    },
    sem:{
        type:Number,
        required:true
    },
    address: {
        type: String
    }


})
userSchema.methods.changePass = function (oldpass, newpass, cb) {
    if (oldpass === this.password) {
        this.password === newpass;
        this.save().then(u => {
            return cb(u)
        }).catch(errh)
    }
    return false
}
userSchema.methods.getResult = function (cb) {
    Result.find({
        "rollno": this.rollno
    }).populate('subject').then(results => {
       // console.log(results)
        return cb(results)
    }).catch(errh)
}

userSchema.methods.addModifyResult = function (scode, om, tm, cb){
    if(!scode&&!om&&!tm){return cb(null,'missing values')}
    Subject.findOne({'scode':scode}).then(sub=>{
        if(!sub){return cb(null,'invaild scode')}
        Result.remove({
            'rollno':this.rollno,
            'subject':sub
        }).then(r=>{

            const result = new Result({
                "rollno":this.rollno,
                "subject":sub,
                'om':om,
                'tm':tm
            })
            result.save().then(result=>{
                return cb(result)
            }).catch(errh)


        }).catch(errh)
    }).catch(errh)

}



userSchema.methods.deletethis = function (cb) {
    Result.deleteMany({
        "rollno": this.rollno
    }).then(results => {

        this.remove().then(r => {
            return cb(r)
        }).catch(errh)
    }).catch(errh)
}




module.exports = mongoose.model('user', userSchema);


// userSchema.methods.addResultBulk=function(){


// }