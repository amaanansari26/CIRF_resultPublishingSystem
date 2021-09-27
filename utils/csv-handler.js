const path = require('path'),
    csvParser=require('csv-parser'),
    csvWriter=require('csv-writer'),
    fs=require('fs'),
    Subject=require('../models/subject'),
    Result=require('../models/result'),
    User=require('../models/user'),
    errh=(err)=>{console.log(err)}
const result = require('../models/result')
const subject = require('../models/subject')


exports.csvtoarray=function(file,cb){
    //fs.unlink
    const results=[]
    fs.createReadStream(file.path)
    .pipe(csvParser({})).on('data',data=>{results.push(data)})
    .on('end',()=>{
        fs.unlink(file.path,()=>{})
        return cb(this.csvformat(results))
    })
    
}
exports.csvformat =  function(arr){
    let scode=null
    const finalArray=[]
    arr.forEach( result => {
        
        if(result.scode !== ""){
            scode=result.scode
        }
        result.scode=scode
        finalArray.push(result)
    });
    console.log(finalArray)
    return finalArray
}
exports.bulkUploadResult= function(file,cb){
    const finalArray=[]
    this.csvtoarray(file,(results)=>{
        for(const result of results){
            Subject.findOne({'scode':result.scode}).then(subject=>{
                if(!subject){return false}
                console.log(result)
                subject.addModifyResult(Number(result.rollno),Number(result.om),Number(result.tm),(rss)=>{
                    
                })

            }).catch(errh)
        }
        cb(results)
    })
}

    


