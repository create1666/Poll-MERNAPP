module.exports ={...require('./auth')} ;


module.exports.notFound = (req, res, next)=>{
    const err = new Error('Not Found');
    err.status = 404;

   return next(err);
    };

    module.exports.errors = (err, req, res, next)=>{
    res.status(err.status || 400).json({
        err: err.message || 'something went wrong'
    });
};