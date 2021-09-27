const user = require('../models/user')
const User = require('../models/user'),
    Result=require('../models/result'),
    Subject=require('../models/subject'),
    errh=(err)=>{console.log(err)}



exports.dashboard=(req,res)=>{
    res.render('student-dashboard')
}

exports.results=(req,res)=>{
    
    req.user.getResult(results=>{
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
        console.log(results)
        

        res.render('student-result',{user:req.user,sem1result,sem2result,sem1total:{sem1om,sem1tm},sem2total:{sem2om,sem2tm}})
    })

    //res.render('student-result')
}