import { FC, useContext } from 'react'
import userService from '../services/user.service'
import { UserContext } from '../Context'
import { toast } from 'react-toastify'
import { UserRoles } from '../types/user.interface'
import { Link } from 'react-router-dom'
import { AxiosError } from 'axios'

const Main: FC = () => {
	const userContext = useContext(UserContext)

	const handleLogout = async () => {
		try {
			await userService.logout()
		} catch (e) {
			if (e instanceof AxiosError) {
				toast(e.response?.data.message)
			} else {
				toast('Непредвиденная ошибка')
			}
		} finally {
			localStorage.removeItem('token')
			userContext?.setUser(null)
			toast('Вы вышли из аккаунта')
		}
	}

	return (
		<div className='main'>
			<p>Имя: {userContext?.user?.name}</p>
			<hr />
			<p>Логин: {userContext?.user?.login}</p>
			<hr />
			<p>Роль: {userContext?.user?.role}</p>
			<hr />
			<button className='logout-bttn' onClick={handleLogout}>
				Выйти
			</button>

			{userContext?.user?.role === UserRoles.ADMIN && (
				<Link to='/admin' className='bttn admin-bttn'>
					Админ панель
				</Link>
			)}

			{(userContext?.user?.role === UserRoles.ADMIN ||
				userContext?.user?.role === UserRoles.MOD) && (
				<Link to='/requests' className='bttn requests-bttn'>
					Заявки
				</Link>
			)}
		</div>
	)
}

export default Main
