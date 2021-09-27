const express = require('express'),
    facultiesController = require('../controllers/faculties'),
    router=express.Router();




const auth=(req,res,next)=>{
        if(req.session.user && req.session.user.type==='fac'){return next()}
        res.redirect('/')
}

router.get('/dashboard',auth,facultiesController.dashboard)

module.exports= router;