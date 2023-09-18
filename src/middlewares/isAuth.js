export const isAuth = (req,res,next) => {
    if (res.locals.user) return next(); 
    res.status(401).send({msg: 'You are not authorized'});
}