import { Router } from "express";
import { __dirname } from "../utils.js";
import CartManager from "../managers/cartManager.js";

import CartController from "../controllers/cart.controller.js";

const cartController = new CartController();

const router = Router();

const cartManager = new CartManager(__dirname + '/db/carts.json');


router.post('/', cartController.createCart.bind(cartController));

router.get('/:idCart', cartController.getById.bind(cartController))

router.post('/:idCart/products/:idProduct', cartController.addProductToCart.bind(cartController));

router.put('/:idCart', cartController.updateCart.bind(cartController))

router.put('/:idCart/products/:idProduct', cartController.updateQuantity.bind(cartController))

router.delete('/:idCart/products/:idProduct', cartController.deleteProductFromCart.bind(cartController));

router.delete('/:idCart', cartController.emptyCart.bind(cartController));

export default router;