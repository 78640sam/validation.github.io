const express=require('express');
const connect=require('./configs/db');


const userController=require('./controllers/user.controller');
const app=express();



app.use('/user',userController)

app.use(express.json());


const start=async()=>{
    await connect();
    app.listen(2345,()=>{
        console.log("server is on");
    })
}


module.exports=start;