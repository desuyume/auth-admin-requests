const Router = require('express').Router
const userController = require('../controllers/UserController')
const { body } = require('express-validator')

const userRouter = new Router()

userRouter.post(
	'/registration',
	body('login').isLength({ min: 3, max: 15 }),
	body('password').isLength({ min: 3, max: 70 }),
	body('name').isLength({ min: 3, max: 15 }),
	userController.registration
)
userRouter.post('/login', userController.login)
userRouter.post('/logout', userController.logout)
userRouter.get('/refresh', userController.refresh)
userRouter.get('/all', userController.getAll)
userRouter.patch('/:id', userController.update)
userRouter.delete('/:id', userController.remove)

module.exports = userRouter
