const result = require('../models/result');

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
        if(req.session.user && req.session.user.type==='stu'){return next()}
        res.redirect('/')
}

router.get('/dashboard',auth,studentsController.dashboard)

router.get('/dashboard/results',auth,studentsController.results)


const auth2=(req,res,next)=>{
    if(req.session.user && req.session.user.type!=='stu'){return next()}
    res.redirect('/')
}
router.get('/edit/:id',auth2,studentsController.getResult)
router.get('/',auth2,studentsController.getStudentList)
router.post('/edit/:id',auth2,studentsController.editStudent)
router.get('/delete/:id',auth2,studentsController.deleteStudent)
router.post('/add',auth2,studentsController.addStudent)

module.exports= router;