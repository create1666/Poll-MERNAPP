const db = require('../models');


exports.showPolls = async (req, res, next) => {
    try{

       const polls = await db.Poll.find();
       
       res.status(200).json(polls);
    }catch(err){
     err.status = 400;
     next(err);
    }
};

exports.createPoll = async (req, res, next)=>{    
    try{
         console.log(req.decoded);
         const {id} = req.decoded;
         const user = await db.User.findById(id);

         const{questions, options } = req.body;
         const poll = await db.Poll.create({
          questions,
          user,
          options: options.map(option=>({option, 
          votes: 0}))
        
          });
         user.polls.push(poll._id);
         await user.save();
          res.status(201).json({...poll._doc, user: user._id});
    } catch (err){
        err.status = 400;
        next(err);
    }
};