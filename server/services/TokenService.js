const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

class TokenService {
	generateTokens(payload) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
			expiresIn: '30m',
		})
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
			expiresIn: '7d',
		})
		return {
			accessToken,
			refreshToken,
		}
	}

	validateToken(token, secret) {
		try {
			const userData = jwt.verify(token, secret);
			return userData;
		} catch (e) {
			return null;
		}
	}

	async saveToken(userId, refreshToken) {
		await prisma.token.upsert({
			where: {
				userId,
			},
			create: {
				userId,
				refreshToken,
			},
			update: {
				refreshToken,
			},
		})
	}

	async removeToken(refreshToken) {
		return await prisma.token.deleteMany({
			where: {
				refreshToken,
			},
		})
	}

	async findToken(refreshToken) {
		return await prisma.token.findFirst({
			where: {
				refreshToken
			}
		})
	}
}

module.exports = new TokenService()
