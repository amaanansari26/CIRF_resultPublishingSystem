const user = require('../models/user')
const User = require('../models/user'),
    Result=require('../models/result'),
    Subject=require('../models/subject'),
    errh=(err)=>{console.log(err)}



exports.dashboard=(req,res)=>{
    res.render('student-dashboard',{user:req.user})
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

exports.getResult= (req,res)=>{
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
}

exports.getStudentList = (req,res)=>{
    if(req.session.user && req.session.user.type==='stu'){return res.redirect('/')}
    User.find({'type':'stu'}).then(students=>{
        console.log(students)
        res.render('studentlist',{user:req.user,students})
    }).catch(errh)
}

exports.editStudent=(req,res)=>{
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



}
exports.deleteStudent=(req,res)=>{
    User.findById(req.params.id).then(student=>{
        if(!student){return res.redirect('/students')}
        student.deletethis(std=>{
            res.redirect('/students')
        })
    }).catch(errh)
}
exports.addStudent=(req,res)=>{
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
}