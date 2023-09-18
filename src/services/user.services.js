import Services from "./class.services.js";

import UserDao from "../persistence/daos/mongodb/user.dao.js";
import ProductDaoMongoDB from "../persistence/daos/mongodb/product.dao.js";

import UserRepository from "../persistence/repository/users/users.repository.js";

const userDao = new UserDao();
const productDao = new ProductDaoMongoDB();
const userRepository = new UserRepository();

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

    async addProdToUserCart(userId, prodId, quantity) {
        try {
            const existProd = await productDao.getById(prodId);
            if (!existProd) return false;
            return userDao.addProdToUserCart(userId,prodId, quantity);
        } catch (error) {
            console.log(error);
        }
    }

    async getByIdDTO(id) {
        try {
            const prod = await userRepository.getByIdDTO(id);
            if (!prod) return false;
            else return prod;
        } catch (error) {
            console.log(error);
        }
    }

}