const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
	seedRoles()
}

async function seedRoles() {
	await prisma.role.upsert({
		where: {
			id: 1,
		},
		create: {
			id: 1,
			role_name: 'user',
		},
		update: {
			role_name: 'user',
		},
	})
	await prisma.role.upsert({
		where: {
			id: 2,
		},
		create: {
			id: 2,
			role_name: 'admin',
		},
		update: {
			role_name: 'admin',
		},
	})
	await prisma.role.upsert({
		where: {
			id: 3,
		},
		create: {
			id: 3,
			role_name: 'mod',
		},
		update: {
			role_name: 'mod',
		},
	})
}

main()
	.then(async () => {
		console.log('seeding complete successfully')
		await prisma.$disconnect()
	})

	.catch(async e => {
		console.error(e)

		await prisma.$disconnect()

		process.exit(1)
	})
