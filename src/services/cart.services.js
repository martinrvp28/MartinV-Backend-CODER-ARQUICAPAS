import Services from "./class.services.js";

import CartDaoMongoDB from "../persistence/daos/mongodb/cart.dao.js";
import UserDao from "../persistence/daos/mongodb/user.dao.js";
import ProductDaoMongoDB from "../persistence/daos/mongodb/product.dao.js";

const productDao = new ProductDaoMongoDB();
const userDao = new UserDao();

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
            throw new Error(error.message);
        }
    }
    
    async deleteProductFromCart  (idCart,idProduct)  {
        try {
            const response = await cartDao.deleteProductFromCart(idCart,idProduct);
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
    async updateCart(idCart, obj)  {
        try {
            const response = await cartDao.updateCart(idCart,obj);
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
    async updateQuantity(idCart, idProduct, objQ){
        try {
            const response = await cartDao.updateQuantity(idCart,idProduct,objQ);
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
    async emptyCart(idCart) {
        try {
            const response = await cartDao.emptyCart(idCart);
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async purchase(id) {
        try {
            const user = await userDao.getById(id);

            console.log('Este es el user de purchase', user);
            if(!user) return false;

            const cart = user.cart;
            console.log('Este es el cart de purchase', cart);
            for (const item of cart) {
                console.log('Este es el id del producto del cart de purchase', item.product);
                const product = await productDao.getById(item.product);
                console.log('Este es el product de purchase', product);
    
                if (product.stock >= item.quantity) {

                    product.stock -= item.quantity;
                    await product.save();
                    user.cart = user.cart.filter(cartItem => cartItem.product !== item.product);
                    console.log('Este es el cart modificado de purchase', user.cart);
                    await user.save();
                }
            }

            return user;
    
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

