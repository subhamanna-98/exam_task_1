const jwt=require('jsonwebtoken')

const User = require('../models/user')

const AuthCheck=(req,res,next)=>{
   const token=req?.body?.token||req?.query?.token||req?.headers['x-access-token']||req?.headers['authorization'];
    if(!token){
        return res.status(400).json({
            status:false,
            message:'Token is required for access this url'
        })
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRECT);
        req.user=decoded;
        
    }catch(err){
        return res.status(400).json({
            status:false,
            message:"invalid token"
        })
    }
    return next();

}




module.exports=AuthCheck