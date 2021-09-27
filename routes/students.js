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

router.get('/edit/:id',(req,res)=>{
    if(req.session.user && req.session.user.type==='stu'){return res.redirect('/')}
    User.findById(req.params.id).then(user=>{
        if(!user){return res.redirect('/')}
        user.getResult(results=>{
            let sem1result=[]
        let sem2result=[]
        let sem1om=0
        let sem2om=0
        let sem1tm=0
        let sem2tm=0

        results.forEach(result=>{
            if(result.subject.sem==1){sem1result.push(result)}
            if(result.subject.sem==2){sem2result.push(result)}
        })
        sem1result.forEach(result=>{
            sem1om=sem1om+result.om
            sem1tm=sem1tm+result.tm
        })
        sem2result.forEach(result=>{
            sem2om=sem2om+result.om
            sem2tm=sem2tm+result.tm
        })
        Subject.find().then(subjects=>{
            console.log(subjects)
            res.render('student-edit',{user:req.user,edituser:user,sem1result,sem2result,sem1total:{sem1om,sem1tm},sem2total:{sem2om,sem2tm},subjects})

        }).catch(errh)
        
        })
    }).catch(errh)
})
router.get('/',(req,res)=>{
    if(req.session.user && req.session.user.type==='stu'){return res.redirect('/')}
    User.find({'type':'stu'}).then(students=>{
        console.log(students)
        res.render('studentlist',{user:req.user,students})
    }).catch(errh)
})
router.post('/edit/:id',(req,res)=>{
    const scode=req.body.scode,
    om=req.body.om,
    tm=req.body.tm
    if(!om||!tm||!scode){return res.redirect('/students/edit/'+req.params.id)}
    User.findById(req.params.id).then(user=>{
        if(!user){return res.redirect('/students/edit/'+req.params.id)}
        user.addModifyResult(scode,om,tm,(result)=>{
            return res.redirect('/students/edit/'+req.params.id)
        })
    }).catch(errh)



})
router.get('/delete/:id',(req,res)=>{
    User.findById(req.params.id).then(student=>{
        if(!student){return res.redirect('/students')}
        student.deletethis(std=>{
            res.redirect('/students')
        })
    }).catch(errh)
})
router.post('/add',(req,res)=>{
    const email=req.body.email,
    password=req.body.password,
    name=req.body.name,
    rollno=req.body.rollno,
    sem=req.body.sem
    if(!email||!password||!rollno||!name||!sem){return res.redirect('/students')}
    User.findOne({'rollno':rollno}).then(user=>{
        if(user){user.remove()}
            const student=new User({
                'name':name,
                'email':email,
                "password":password,
                'rollno':rollno,
                'sem':sem,
                'type':'stu',
                'year':1
            })
            student.save().then(stu=>{
                res.redirect('/students')
            }).catch(errh)
        
    }).catch(errh)
})

module.exports= router;