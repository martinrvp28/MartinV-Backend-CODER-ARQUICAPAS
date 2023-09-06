import Controllers from "./class.controllers.js";
import CartService from "../services/cart.services.js";
import mongoose, { isValidObjectId } from "mongoose";

const cartService = new CartService();

export default class CartController extends Controllers {
    constructor(){
        super(cartService);
    }

    async createCart(req, res, next) {
    
        try {
            const obj = {products:[]}
            const response = await cartService.create(obj);
            res.status(200).json(response);
        } catch (error) {
            next(error.message);
        }
    }
    
    async addProductToCart(req,res,next){
    
        try {
            const {idCart, idProduct} = req.params;
            const addCart = await cartService.addProductToCart(idCart,idProduct);
            if (!addCart) res.status(404).json({msg:'Cart not found ACA'});
            else res.json(addCart);
        } catch (error) {
            next(error.message);
        }
    
    }
    
    async deleteProductFromCart(req,res,next){
    
        try {
            const {idCart, idProduct} = req.params;
            const del = await cartService.deleteProductFromCart(idCart,idProduct);
            if (!del) res.status(404).json({msg:'Cart or Product not found'});
            else res.json(del);
    
        } catch (error) {
            console.log(error);
        }
    }
    
    async updateCart(req,res,next) {
        try {
            
            const {idCart} = req.params;
            const obj = req.body;
    
            const add = await cartService.updateCart(idCart,obj);
            if (!add) res.status(404).json({msg:'Cart not found'});
            else res.json(add);
        } catch (error) {
            console.log(error);
        }
    }
    
    async updateQuantity(req,res,next) {
        try {
            const {idCart, idProduct} = req.params;
            const objQ = req.body;
    
            const upd = await cartService.updateQuantity(idCart, idProduct, objQ);
            
            if (!upd) res.status(404).json({msg:'Cart or Product not found'});
            else res.json(upd);
        } catch (error) {
            console.log(error);
        }
    }
    
    async emptyCart (req, res, next) {
    
        try {
            const {idCart} = req.params;
            const del = await cartService.emptyCart(idCart);
            if (!del) res.status(404).json({msg:'Cart  not found'});
            else res.json(del);
        } catch (error) {
            console.log(error);
        }
    
    }



}

