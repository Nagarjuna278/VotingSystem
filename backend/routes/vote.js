const express = require('express');
const router = express.Router();

const candidate = require('./../database/schema/candidate');
const voter = require('./../database/schema/voters');

const secretkey = "hackerearthadmin";

router.post('/createCandidtae/:number',(req,res)=>{
    if(secretkey == req.params.number){
    new candidate(req.body)
    .save()
    .then(data => {
        console.log(req.body)
        res.send(data)
    })
    .catch(error => {console.log(error)})
    }
    else{
        throw error;
    }
})
router.get('/',(req,res)=>{
    candidate.find()
    .then(data=>{
        res.json(data)
    })
    .catch(error=>console.log(error))
})
router.get('/:id',(req,res)=>{
    candidate.findOne({_id:req.params.id})
    .then(data=>res.send(data))
    .catch(error=>console.log(error))
})
router.get('/candidate/:id',(req,res)=>{
    voter.findOne({ip:req.ip})
    .then(ip=>{
        console.log(!ip)
        console.log(req.clientIp);
        console.log(typeof(req.clientIp))
        if(!ip){
            new voter({ip:req.clientIp})
            .save()
            .then(data=>console.log(data+"voted"))
            .catch(error=>console.log(error))
            candidate.findOne({_id:req.params.id})
            .then(data=>{
                data.votes=data.votes+1;
                data.save()
                console.log(data.votes)
                res.json(data)
            })
            .catch(error=>console.log(error))
        }
        else{
            res.send({
                message:"One vote per One Ip Address"
            })
        }
    })
    .catch(error => console.log(error))
    
})
router.delete('/candidate/delete/:id/:key',(req,res)=>{
    if(req.params.key == secretkey){
        console.log(req.params.id)
        candidate.deleteOne({_id:req.params.id})
        .then(data=>{
            console.log(data)
            res.send(data)
        })
        .catch(erroe=>console.log(error))
    }
    else{
        console.log(error)
    }
})

router.put('/candidate/update/:id',(req,res)=>{
    candidate.findOne({candidateId:req.params.id})
    .then(data=>{
        data.name=req.body.name;
        data.expertIn = req.body.expertIn;
        data.challengesSolved=req.body.challengesSolved,
        data.candidateExpertiseLevel=req.body.candidateExpertiseLevel,
        data.save()
        res.json(data);
    })
    .catch(error=>console.log(error))
})


module.exports = router;