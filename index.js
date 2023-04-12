const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

const manager={
    id:2,
    name:"Don Don Sagar",
    gpin:"yoyoyoy"
}
const emp={
    id:1,
    name:"Don Sagar",
    gpin:"G101001",
    leave:"available",
    lApplied:false,
    lApproved:true
}
app.listen(9999, ()=>{console.log('server running')})

app.post('/login/emp',(req,res)=>{
    jwt.sign({emp},'secKey',(err,token)=>{
        res.json({
            token
        })
    })

    
})

app.post('/login/admin',(req,res)=>{
    jwt.sign({manager},'secKey',(err,token)=>{
        res.json({
            token
        })
    })

    
})
app.get('/getLeave', verifyToken,(req,res)=>{
    jwt.verify(req.token, 'secKey', (err,data)=>{
        if(err){
            res.sendStatus(403)
        }else{
            res.json({
                data: data.emp.leave
            })
        }
        
    })
    // res.json(
    //     {
    //         message: "Leave available"
    //     }
    // )
})
//Apply Leave
app.post ('/applyLeave', (req,res)=>{
    jwt.verify(req.token, 'secKey', (err,data)=>{
        if(err){
            res.sendStatus(403)
        }else{
            if (emp.leave=="Available"){
                data.emp.lApplied =true
                emp.lApplied=true
                res.json({
                    req_status: emp.lApplied,
                    message:"Applied"
                })}else {
                    res.json({
                        message:"cannot apply"
                    })
                }
            }
            
    
        })})

app.post('/approveLeave', verifyToken, (req,res)=>{
    // jwt.sign({manager}, "secKey", (err,token)=>{
    //     res.json({
    //         token
    //     })
    jwt.verify(req.token, 'secKey', (err,data)=>{
        if (err){
            res.sendStatus(403);

        }
    })
})

function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization']
    // console.log(bearerHeader)
    if (typeof bearerHeader !== 'undefined'){

        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]

        req.token = bearerToken
       next()
    }else{
        res.sendStatus(403)
    }
}