const User = require('../models/user'),
    Result=require('../models/result'),
    Subject=require('../models/subject')

exports.dashboard=(req,res)=>{
    res.render('hod-dashboard',{user:req.user})
}