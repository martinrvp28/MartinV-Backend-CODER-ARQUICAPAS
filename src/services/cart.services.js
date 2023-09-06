import Services from "./class.services.js";

import CartDaoMongoDB from "../daos/mongodb/cart.dao.js";

const cartDao = new CartDaoMongoDB();

export default class CartService extends Services {
    constructor(){
        super(cartDao);
    }

    async addProductToCart (cartId,prodId)  {

        try {
            const response = await cartDao.addProductToCart(cartId,prodId);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    
    async deleteProductFromCart  (idCart,idProduct)  {
        try {
            const response = await cartDao.deleteProductFromCart(idCart,idProduct);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    
    async updateCart(idCart, obj)  {
        try {
            const response = await cartDao.updateCart(idCart,obj);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    
    async updateQuantity(idCart, idProduct, objQ){
        try {
            const response = await cartDao.updateQuantity(idCart,idProduct,objQ);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    
    async emptyCart(idCart) {
        try {
            const response = await cartDao.emptyCart(idCart);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}

