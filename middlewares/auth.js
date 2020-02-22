const jwt = require('jsonwebtoken');
const db =  require('../models');



module.exports = (req, res, next)=>{
    console.log(req.body.token, req.headers.authorization);
   
    if(req.headers.authorization || req.body.token){
       
     const token = req.headers.authorization.split(' ')[1];
     
     jwt.verify(token, process.env.SECRET, (err, decoded) => {
      
        
         if(err){
             next(Error('Failed to authenticate'));
         }else{
             req.decoded = decoded;
             next();
         }
     });
    }else{
        next(Error('No token provided'));
    }
};

 
