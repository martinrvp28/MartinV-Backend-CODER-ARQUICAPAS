import Controllers from "./class.controllers.js";
import UserService from "../services/user.services.js";

const userService = new UserService();

export default class UserController extends Controllers {
    constructor(){
        super(userService);
    }

    async registerUser (req,res){
        try {
            res.json({msg: 'Register Ok', session: req.session});
    
        } catch (error) {
            console.log(error);
        }
    };
    
    async loginUser (req, res) {
        try {
    
            const user = await userDao.getById(req.session.passport.user);
            
            if (user) res.redirect('/profile');
            res.redirect('/login');
            
        } catch (error) {
            console.log(error);
        }
    }
    
    async gitHubResponse  (req,res,next){
        try {
            const {first_name, last_name, email, isGitHub} = req.user;
            res.json({
                msg:'Register/Login GitHub OK',
                session: req.session,
                userData: {
                    first_name,
                    last_name,
                    email,
                    isGitHub
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    

}
