import express from "express";
import { ProductController } from "../controllers/product.controller";
import { CartController } from "../controllers/cart.controller";
import { OrderController } from "../controllers/order.controller";
import { upload } from "../middlewares/image.middleware";

export const privateRoutes = express.Router();

privateRoutes.post('/products/create', upload.single('image') ,ProductController.create);
privateRoutes.get('/products', ProductController.getProducts);
privateRoutes.get('/products/:id', ProductController.getProductById);
privateRoutes.put('/products/:id/update', ProductController.updateProduct);
privateRoutes.delete('/products/:id/delete', ProductController.removeProduct);

privateRoutes.post('/carts/create', CartController.createCart);
privateRoutes.get('/carts', CartController.getCartItems);
privateRoutes.delete('/carts/:id/delete', CartController.createCart);

privateRoutes.post('/orders/create', OrderController.createOrder);