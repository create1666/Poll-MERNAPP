const db = require('../models');


exports.showPolls = async (req, res, next) => {
    try{

       const polls = await db.Poll.find()
       .populate('user', ['username', 'id']);
       
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
          options: options.map(option => ({ option, 
          votes: 0 }))
        
          });
         user.poll.push(poll._id);
         await user.save();
          
          res.status(201).json({...poll._doc, user: user._id});
    } catch (err){
        err.status = 400;
        next(err);
    }
};

exports.usersPolls = async(req, res, next) =>{
    try{
      const{id} = req.decoded;

      const user =await db.User.findById(id)
      .populate('polls');

    
     res.status(202).json(user.polls);

    }catch(err){
      err.status = 400;
      next(err);
    }
};

exports.getPoll = async (req, res, next) => {
    try{
    const {id} = req.params;

    const poll = await db.Poll.findById(id)
    .populate('user', ['username', 'id']);


    if(!poll)throw new Error('No poll Found');
    
    res.status(200).json(poll);

    }catch(err){
    err.status = 400;
    }
};