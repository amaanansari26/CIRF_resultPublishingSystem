const express = require('express'),
    hodController = require('../controllers/hod'),
    User=require('../models/user'),
    errh = (err) => {
        console.log(err)
    },
    router=express.Router();




const auth=(req,res,next)=>{
        if(req.session.user && req.session.user.type==='hod'){return next()}
        res.redirect('/')
}

router.get('/dashboard',auth,hodController.dashboard)
router.get('/dashboard/faculties',auth,hodController.facultylist)
router.post('/dashboard/faculties/add',auth,hodController.facultyadd)
router.get('/dashboard/faculties/delete/:id',(req,res)=>{
    User.findById(req.params.id).then(student=>{
        if(!student){return res.redirect('/students')}
        student.deletethis(std=>{
            res.redirect('/hod/dashboard/faculties')
        })
    }).catch(errh)
})


module.exports= router;