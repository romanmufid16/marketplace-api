import express from "express";
import { ProductController } from "../controllers/product.controller";
import { CartController } from "../controllers/cart.controller";

export const privateRoutes = express.Router();

privateRoutes.post('/products/create', ProductController.create);
privateRoutes.get('/products', ProductController.getProducts);
privateRoutes.get('/products/:id', ProductController.getProductById);
privateRoutes.put('/products/:id/update', ProductController.updateProduct);
privateRoutes.delete('/products/:id/delete', ProductController.removeProduct);

privateRoutes.post('/carts/create', CartController.createCart);
privateRoutes.get('/carts', CartController.getCartItems);