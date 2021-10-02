const express = require('express'),
rootController=require('../controllers/root')
    router=express.Router();




//auth routes
router.get('/',rootController.getlogin)
router.get('/logout',rootController.getlogout)


router.post('/login',rootController.postlogin)
//end auth route

//csv upload
router.post('/uploadcsv',rootController.csvupload)//protected
router.get('/uploadresult',rootController.resultsupload)//protected

module.exports= router;