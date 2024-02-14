const { cookieConfig } = require('../config/cookie.config')
const ApiError = require('../exceptions/ApiError')
const userService = require('../services/UserService')
const { validationResult } = require('express-validator')

class UserController {
	async registration(req, res, next) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
			}

			const { login, password, name } = req.body

			const userData = await userService.registration(login, password, name)
			res.cookie('refreshToken', userData.refreshToken, cookieConfig)
			return res.json(userData)
		} catch (e) {
			next(e)
		}
	}

	async login(req, res, next) {
		try {
			const { login, password } = req.body
			const userData = await userService.login(login, password)
			res.cookie('refreshToken', userData.refreshToken, cookieConfig)
			return res.json(userData)
		} catch (e) {
			next(e)
		}
	}

	async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies
			const token = await userService.logout(refreshToken)
			res.clearCookie('refreshToken')
			return res.json(token)
		} catch (e) {
			next(e)
		}
	}

	async refresh(req, res, next) {
		try {
			const { refreshToken } = req.cookies
			const userData = await userService.refresh(refreshToken)
			res.cookie('refreshToken', userData.refreshToken, cookieConfig)
			return res.json(userData)
		} catch (e) {
			next(e)
		}
	}

	async getAll(req, res, next) {
		try {
			let { limit, page } = req.query
			page = page || 1
			limit = limit || 5
			let offset = page * limit - limit
			const users = await userService.getAll(+limit, +offset)
			return res.json(users)
		} catch (e) {
			next(e)
		}
	}

	async update(req, res, next) {
		try {
			const { id } = req.params
			const { role } = req.body
			const updatedUser = await userService.update(+id, role)
			return res.json(updatedUser)
		} catch (e) {
			next(e)
		}
	}

	async remove(req, res, next) {
		try {
			const { id } = req.params;
			const deletedUser = await userService.remove(+id);
			return res.json(deletedUser);
		} catch (e) {
			next(e)
		}
	}
}

module.exports = new UserController()
