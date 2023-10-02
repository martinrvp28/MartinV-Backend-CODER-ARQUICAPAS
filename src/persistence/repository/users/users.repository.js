import UserDao from "../../daos/mongodb/user.dao.js";
const userDao = new UserDao();
import { logger } from "../../../utils/logger.js";

import UserResDTO from "../../dtos/users/users.res.dto.js";

export default class UserRepository {
    constructor (){
        this.dao = userDao;
    }

    async getByIdDTO(id) { 
        try {
            const response = await this.dao.getById(id);
            return new UserResDTO(response);
        } catch (error) {
            logger.error(error);
        }
    }

}