const result = require('../models/result');
const subject = require('../models/subject');

const express = require('express'),
studentsController = require('../controllers/students'),
User=require('../models/user'),
Subject=require('../models/subject'),
mongoose = require('mongoose'),
errh = (err) => {
    console.log(err)
},
    router=express.Router();

    const auth=(req,res,next)=>{
        if(req.session.user && req.session.user.type!=='stu'){return next()}
        res.redirect('/')
}


router.get('/',(req,res)=>{
    // console.log('trigger')
     Subject.find().then(subjects=>{
         User.find({'type':'fac'}).then(user=>{
             res.render('subjectlist',{user:req.user,subjects,faculty:user})
         }).catch(errh)
     }).catch(errh)
 })

router.post('/add',(req,res)=>{
    if(req.session.user && req.session.user.type==='stu'){return res.redirect('/')}
    const scode=req.body.scode,
        sname=req.body.sname,
        faculty=req.body.faculty,
        sem=req.body.sem
        console.log(req.body)
        if(!sname||!faculty||!sem){return res.redirect('/subjects')}
       Subject.find({'scode':scode}).then(sub=>{
           if(sub.length>0){sub[0].remove()}
           const subject =new Subject({
               'scode':scode,
               'sname':sname,
               'faculty':faculty,
               'sem':sem,
               'year':1
           })
           subject.save().then(subb=>{
            return res.redirect('/subjects')
           }).catch(errh)
       }).catch(errh)
    
})

router.get('/delete/:id',(req,res)=>{
    Subject.findById(req.params.id).then(subject=>{
        if(!subject){return req.redirect('/subjects')}
        subject.removethis(sub=>{
            return res.redirect('/subjects')
        })
    }).catch(errh)
})


module.exports= router;