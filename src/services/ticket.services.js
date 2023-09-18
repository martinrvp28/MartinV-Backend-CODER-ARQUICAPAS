import Services from "./class.services.js";
import UserDao from "../persistence/daos/mongodb/user.dao.js";
const userDao = new UserDao();
import ProductDaoMongoDB from "../persistence/daos/mongodb/product.dao.js";
const productDao = new ProductDaoMongoDB();
import TicketDaoMongo from "../persistence/daos/mongodb/ticket.dao.js";
const ticketDao = new TicketDaoMongo();

export default class TicketService extends Services {
    constructor(){
        super(ticketDao)
    }



    async generateTicket(userId){
        try {
            const user = await userDao.getById(userId);
            if (!user) return false;
            let amountAcc = 0;
            console.log('Este es el cart que revisa el ticket', user.cart)
            for (const prod of user.cart) {
                const idProd = prod.product.toString();
                const prodDB = await productDao.getById(idProd);
                if (prod.quantity <= prodDB.stock) {
                    const amount = prod.quantity * prodDB.price;
                    console.log('Este es amount de la multi del prod', amount)
                    console.log('Este es amountAcc antes de sumar', amountAcc)
                    amountAcc += amount;
                    
                }
            }
            const ticket = await ticketDao.create({
                code: `${Math.random()}`,
                purchase_datetime: new Date().toLocaleString(),
                amount: amountAcc,
                purchaser: user.email
            })
            return ticket;
        } catch (error) {
            console.log(error);
        }
    }
}

