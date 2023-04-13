const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

// const manager={
    
// }
const emp={
    id:1,
    name:"Don Sagar",
    gpin:"G101001",
    leave:"available",
    lApplied:false,
    lApproved:false,
    rank:"Employee"
}
const manager={
    
        id:2,
        name:"Don Don Sagar",
        gpin:"yoyoyoy",
        leave:"available",
        lApplied:false,
        lApproved:false,
        rank:"Manager"
    
}
let leaveApplied = false


app.listen(9999, ()=>{console.log('server running')})

app.post('/login/emp',(req,res)=>{
    jwt.sign({emp},'secKey',(err,tokenE)=>{
        res.json({
            tokenE
        })
    })

    
})
app.post('/login/admin',(req,res)=>{
    jwt.sign({manager},'secKey',(err,tokenM)=>{
        res.json({
            tokenM
        })
    })

    
})

// app.post('/login/admin',(req,res)=>{
//     jwt.sign({manager},'secKey',(err,token)=>{
//         res.json({
//             token
//         })
//     })

    
// })
app.get('/getLeave', verifyTokenE,(req,res)=>{
    jwt.verify(req.tokenE, 'secKey', (err,data)=>{
        if(err){
            res.sendStatus(403)
        }else{
            res.json({
                data:data.emp.leave
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
app.post ('/applyLeave', verifyTokenE, (req,res)=>{
    jwt.verify(req.tokenE, 'secKey', (err,data)=>{
        if(err){
            res.sendStatus(403)
        }else{
            if (emp.leave=="available"){
                data.emp.lApplied =true
                emp.lApplied=true
                leaveApplied=true
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

app.post('/approveLeave', verifyTokenM, (req,res)=>{
    jwt.verify(req.tokenM, 'secKey', (err,data)=>{
        if (err){
            res.sendStatus(403);

        }else{
            if (manager.rank==="Manager"){ 
                if (leaveApplied===true){
                    emp.lApproved=true
                // data.emp.lApproved=true
                
                res.json({
                    req_status: emp.lApproved,
                    message: "Leave Approved",
                    emp
                })
                leaveApplied=false
                }else {
                    res.json({
                        message:"Leave not applied"
                    })
                }
        
                
            }else {
                res.json({
                    message:"Not Manager"
                })
            }
           
        }
    })
})

function verifyTokenE(req,res,next){
    const bearerHeader = req.headers['authorization']
    // console.log(bearerHeader)
    if (typeof bearerHeader !== 'undefined'){

        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]

        req.tokenE = bearerToken
       next()
    }else{
        res.sendStatus(403)
    }
}

function verifyTokenM(req,res,next){
    const bearerHeader = req.headers['authorization']
    // console.log(bearerHeader)
    if (typeof bearerHeader !== 'undefined'){

        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]

        req.tokenM = bearerToken
       next()
    }else{
        res.sendStatus(403)
    }
}