const express = require('express'),
rootController = require('../controllers/root'),
    router=express.Router();

router.get('/',(req,res)=>{
    req.session.a='a'
    res.send('up')
})

module.exports= router;