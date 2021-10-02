const result = require('../models/result');
const subject = require('../models/subject');

const express = require('express'),
subjectsController = require('../controllers/subjects'),
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


router.get('/',subjectsController.getStudentList)

router.post('/add',subjectsController.addSubject)//protected

router.get('/delete/:id',subjectsController.deleteSubject)//protected


module.exports= router;