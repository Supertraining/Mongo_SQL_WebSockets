import UserController from '../controllers/user.js';
import ProductsControllers from '../controllers/products.js';
import MessagesController from '../controllers/messages.js';
import express from 'express';
import passport from 'passport';
import { passportLogin, passportRegister, requireAuthentication } from './middlewares/auth.js';
import logger from '../logger/logger.js';
import UsersDAO from '../DAOs/userDAO.js';
import UserService from '../services/user.js';

import * as user from '../models/user.js';

const userModel = user.model
const usersDAO = new UsersDAO(userModel);
export const userService = new UserService(usersDAO);
const userController = new UserController(userService);

const messageController = new MessagesController();
const productsController = new ProductsControllers();
const router = express.Router();


export const sockets = async (Socket) => {
	logger.info('Nuevo usuario conectado');

	
	Socket.emit('productos', productsController.getAll() );

	Socket.on('new-product', productsController.save);

	Socket.on('deleteProduct', productsController.delete);

	Socket.on('updatedProduct', productsController.update);

	Socket.on('selectedProduct', productsController.getById);

	Socket.on('new-message', messageController.save);

	let messages = await messageController.getAll();
	
	Socket.emit('normalizedMessages', messages);
}


router.get('/register', userController.getRegister);

router.post(
	'/register',
	passportRegister,
	passport.authenticate('register', { failureRedirect: '/failregister', successRedirect: '/inicio' })
);

router.get('/failregister', userController.failregister);

router.get('/login', userController.login);

router.post(
	'/login',
	passportLogin,
	passport.authenticate('login', { failureRedirect: '/faillogin', successRedirect: '/inicio' })
);

router.get('/faillogin', userController.failLogin);

router.get('/inicio/', requireAuthentication, userController.getById);

router.get('/logout', userController.logout);

router.get('/', userController.getInicio);

export default router;