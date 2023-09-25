import Controllers from "./class.controllers.js";
import UserService from "../services/user.services.js";

import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse();
import error from "../utils/errors.dictionary.js"
const userService = new UserService();

export default class UserController extends Controllers {
    constructor(){
        super(userService);
    }

    async registerUser (req,res){
        try {
            return httpResponse.Ok(res, {msg: 'Register Ok', session: req.session});    
        } catch (error) {
            next(error);
        }
    };
    
    async loginUser (req, res) {
        try {
    
            const user = await userDao.getById(req.session.passport.user);
            
            if (user) res.redirect('/profile');
            res.redirect('/login');
            
        } catch (error) {
            next(error);
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
            next(error);
        }
    }
    

    async addProdToUserCart (req,res,next) {
        try {
            const {_id} = req.user;
            const {idProd} = req.params;
            const {quantity} = req.params;
            const newProdToUserCart = await userService.addProdToUserCart(_id, idProd, Number(quantity));
            if (!newProdToUserCart) return httpResponse.NotFound(res, error.ERROR_ADD_PROD);  
            return httpResponse.Ok(res, newProdToUserCart);  
        } catch (error) {
            next(error);
        }
    }

    async getByIdDTO (req, res, next) {
        try {
            const {id} = req.params;
            const item = await this.service.getByIdDTO(id);
            if (!item) return httpResponse.NotFound(res, error.USER_NOT_FOUND);  
            else  return httpResponse.Ok(res, item); 

        } catch (error) {
            next(error);
        }
    }


}
