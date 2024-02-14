export interface IUser {
	id: number
	login: string
	name: string
	role: RoleType
}

type RoleType = 'user' | 'admin' | 'mod'

export enum UserRoles {
	USER = 'user',
	ADMIN = 'admin',
	MOD = 'mod',
}

export interface IUserWithTokens {
	accessToken: string
	refreshToken: string
	user: IUser
}

export interface IUserTokenResponse {
	data: IUserWithTokens
}

export interface IFetchedUser {
	id: number
	name: string
	login: string
	role: {
		role_name: string
	}
}

export interface IFetchedUsers {
	users: IFetchedUser[]
	count: number
}
