import UserDao from "../persistence/daos/mongodb/user.dao.js";

const userDao = new UserDao();

export const checkAdmin = async (req,res,next) => {

    try {

        const user = await userDao.getById(req.session.passport.user);

        if (user.role==="admin") return next(); 
        res.status(401).send({msg: 'You are not Administrator'});
        
    } catch (error) {
        console.log(error)
    }
    
}