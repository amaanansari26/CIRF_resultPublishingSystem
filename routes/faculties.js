const express = require('express'),
    facultiesController = require('../controllers/faculties'),
    router=express.Router();

router.get('/',(req,res)=>{
    res.send('up')
})

module.exports= router;