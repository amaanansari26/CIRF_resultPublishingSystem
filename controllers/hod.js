
const User = require('../models/user'),
    Result=require('../models/result'),
    Subject=require('../models/subject'),
    errh = (err) => {
        console.log(err)
    }

exports.dashboard=(req,res)=>{
    user=req.session.user
    res.render('hod-dashboard',user)
}

exports.facultylist = (req,res)=>{
    user=req.user

    User.find({"type":"fac"}).then(users=>{

        res.render('facultylist',{user,students:users})
    }).catch()
 
}
exports.facultyadd = (req,res)=>{
    const email=req.body.email,
    password=req.body.password,
    name=req.body.name,
    address=req.body.address
    if(!email||!password||!name||!address){return res.redirect('/hod/dashboard/faculties')}

    const user=new User({
        "email":email,
        "password":password,
        "name":name,
        "address":address,
        "type":"fac",
        "sem":0,
        "year":0
        })
        user.save().then(user=>{
            return res.redirect('/hod/dashboard/faculties')
        }).catch()
 
}

