import cartRouter from './cartRouter.js';
import viewsRouter from './views.router.js';
import userRouter from './userRouter.js';
import productsRouter from './productsRouter.js';
import ticketRouter from './ticketRouter.js';

import { Router } from "express";

export default class MainRouter {
    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    initRoutes() {

        this.router.use('/products', productsRouter);
        this.router.use('/carts', cartRouter);
        this.router.use('/', userRouter);
        this.router.use('/', viewsRouter);
        this.router.use('/ticket', ticketRouter)
    }

    getRouter() {
        return this.router;
    }
}








