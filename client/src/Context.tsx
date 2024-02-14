import {
	FC,
	PropsWithChildren,
	createContext,
	useEffect,
	useState,
} from 'react'
import { IUser } from './types/user.interface'
import userService from './services/user.service'

interface IContext {
	user: IUser | null
	setUser: (user: IUser | null) => void
	isFetched: boolean
}

export const UserContext = createContext<IContext | null>(null)

const Context: FC<PropsWithChildren> = ({ children }) => {
	const [user, setUser] = useState<IUser | null>(null)
	const [isFetched, setIsFetched] = useState<boolean>(false)

	const checkAuth = async () => {
		let response
		try {
			response = await userService.refresh()
			localStorage.setItem('token', response.data.accessToken)
			setUser(response.data.user)
		} catch (e) {
			console.log(response)
		} finally {
			setIsFetched(true)
		}
	}

	useEffect(() => {
		checkAuth()
	}, [])

	return (
		<UserContext.Provider value={{ user, setUser, isFetched }}>
			{children}
		</UserContext.Provider>
	)
}

export default Context
