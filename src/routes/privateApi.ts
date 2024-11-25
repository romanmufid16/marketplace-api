import express, { NextFunction, Request, Response } from "express";
import { ProductController } from "../controllers/product.controller";
import { CartController } from "../controllers/cart.controller";
import { OrderController } from "../controllers/order.controller";
import { upload } from "../middlewares/image.middleware";
import { UserController } from "../controllers/user.controller";
import { merchantMiddleware } from "../middlewares/role.middleware";

export const privateRoutes = express.Router();

privateRoutes.get('/users/profile', UserController.getUser);

privateRoutes.post('/products/create', upload.single('image'), ProductController.create);
privateRoutes.get('/products', ProductController.getProducts);
privateRoutes.get('/products/:id', ProductController.getProductById);
privateRoutes.put('/products/:id/update', ProductController.updateProduct);
privateRoutes.delete('/products/:id/delete', ProductController.removeProduct);

privateRoutes.post('/carts/create', CartController.createCart);
privateRoutes.get('/carts', CartController.getCartItems);
privateRoutes.delete('/carts/:id/delete', CartController.createCart);

privateRoutes.post('/orders/create', OrderController.createOrder);


privateRoutes.get('/merchant', merchantMiddleware, (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: 'Merchant only'
  });
});