module.exports = class UserDto {
	id
	login
	name
	role

	constructor(model) {
		this.id = model.id
		this.name = model.name
		this.login = model.login
		this.role = model.role
	}
}
