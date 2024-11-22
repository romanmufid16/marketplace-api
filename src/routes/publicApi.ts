import express from "express";
import { UserController } from "../controllers/user.controller";
import { ProductController } from "../controllers/product.controller";

export const publicRoutes = express.Router();

publicRoutes.post('/users/register', UserController.register);
publicRoutes.post('/users/auth', UserController.login);

publicRoutes.post('/products/create', ProductController.create);
publicRoutes.get('/products', ProductController.getProducts);