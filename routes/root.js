const express = require('express'),
User=require('../models/user'),
csv=require('../utils/csv-handler'),

    router=express.Router();




//auth routes
router.get('/',(req,res)=>{
   
    if(req.session.user && req.session.user.type==="stu"){ return res.redirect('/students/dashboard')}
    if(req.session.user && req.session.user.type==="hod"){ return res.redirect('/hod/dashboard')}
    if(req.session.user && req.session.user.type==="fac"){ return res.redirect('/faculties/dashboard')}
    res.render('login')
})
router.get('/logout',(req,res)=>{
    req.session.destroy()
    res.redirect('/')
})


router.post('/login',(req,res)=>{
User.findOne({
    'email':req.body.email,
    "password":req.body.password
}).then(user=>{
    if(!user){return res.redirect('/')}
    req.session.user=user
    if(req.session.user && req.session.user.type==="stu"){ return res.redirect('/students/dashboard')}
    if(req.session.user && req.session.user.type==="hod"){ return res.redirect('/hod/dashboard')}
    if(req.session.user && req.session.user.type==="fac"){ return res.redirect('/faculties/dashboard')}
    
}).catch()
})
//end auth route

//csv upload
router.post('/uploadcsv',(req,res)=>{
   
    if(req.user&&(req.user.type==='hod'||req.user.type==='fac')&& req.files.csv){
        const file =req.files.csv[0]
        if(file){
            csv.bulkUploadResult(file,(result)=>{
                console.log(result)
              
                    req.flash("csv","Result Updated Successfully!")
                    res.redirect('/uploadresult?success=true')
                
            })
        }

    }else{
        res.redirect('/')
    }
})
router.get('/uploadresult',(req,res)=>{
    if(req.user&&(req.user.type==='hod'||req.user.type==='fac')){
    const user=req.user;
    msg=''
    if(req.query.success){msg='CSV Upload Succesfully!'}

    res.render('resultUpload',{user,msg})
}else{
    res.redirect('/')
}})

module.exports= router;