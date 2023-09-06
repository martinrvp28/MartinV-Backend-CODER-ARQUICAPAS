import { Router } from "express";
import ProductManager from "../managers/productManager.js";
import { __dirname } from "../utils.js";
import {upload} from "../middlewares/multerThumbnail.js";

import ProductController from "../controllers/product.controllers.js";

const productController = new ProductController();

const router = Router();

const productManager = new ProductManager(__dirname + '/db/products.json');

router.get('/', productController.getAllProducts.bind(productController));

router.get('/:id', productController.getById.bind(productController));

router.post('/', productController.create.bind(productController));

router.put('/:id', productController.update.bind(productController));

router.delete('/:id', productController.delete.bind(productController));



export default router;