import Services from "./class.services.js";

import UserDao from "../daos/mongodb/user.dao.js";

const userDao = new UserDao();

export default class UserService extends Services {
    constructor(){
        super(userDao);
    }

    async register (user) {
        try {
            return await userDao.register(user);
        } catch (error) {
            console.log(error);
        }
    }

    async login(user) {
        try {
            return await userDao.login(user);
        } catch (error) {
            console.log(error);
        }
    }
}