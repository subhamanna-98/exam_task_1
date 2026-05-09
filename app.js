require('dotenv').config()
const express=require('express')
const ejs=require('ejs')
const DBCon=require('./app/config/db')
const path=require('path')
const cors=require('cors')
const session=require('express-session')
const cookieParser=require('cookie-parser')


const app=express();

DBCon()

app.use(cors())
//configure ejs
app.set('view engine','ejs')
app.set('views','views')



//static folder
app.use(express.static('public'))
app.use('uploads',express.static(path.join(__dirname,'/uploads')))
app.use('/uploads',express.static('uploads')); 
//json define
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//define routes

const authRouter = require('./app/routes/authRouter')
app.use(authRouter)

const userSubRouter = require('./app/routes/userSubRouter')
app.use('/api',userSubRouter)


const taskRouter = require('./app/routes/taskRouter')
app.use('/api',taskRouter)


const PORT=5000;

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})