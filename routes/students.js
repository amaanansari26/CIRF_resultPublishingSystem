const express = require('express'),
studentsController = require('../controllers/students'),
    router=express.Router();

router.get('/',(req,res)=>{
    res.send('up')
})

module.exports= router;