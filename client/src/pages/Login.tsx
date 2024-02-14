import { FC, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import userService from '../services/user.service'
import { UserContext } from '../Context'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

const Login: FC = () => {
	const [login, setLogin] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	const userContext = useContext(UserContext)

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			const response = await userService.login(login, password)
			localStorage.setItem('token', response.data.accessToken)
			userContext?.setUser(response.data.user)
			toast('Вы успешно вошли!')
		} catch (e) {
			if (e instanceof AxiosError) {
				toast(e.response?.data.message)
			} else {
				toast('Непредвиденная ошибка')
			}
		}
	}

	return (
		<form onSubmit={e => handleLogin(e)}>
			<h2>Вход</h2>

			<input
				value={login}
				onChange={e => setLogin(e.target.value)}
				placeholder='Логин'
			/>
			<input
				value={password}
				onChange={e => setPassword(e.target.value)}
				placeholder='Пароль'
				type='password'
			/>

			<button>Войти</button>

			<p>
				Нет аккаунта? <Link to='/registration'>Зарегистрируйся</Link>
			</p>
		</form>
	)
}

export default Login
