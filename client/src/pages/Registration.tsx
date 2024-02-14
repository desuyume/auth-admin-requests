import { FC, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import userService from '../services/user.service'
import { UserContext } from '../Context'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

const Registration: FC = () => {
	const [name, setName] = useState<string>('')
	const [login, setLogin] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	const userContext = useContext(UserContext)

	const handleReg = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (name.length < 3 || name.length > 15) {
			toast('Имя должно быть от 3 до 15 символов')
			return
		}

		if (login.length < 3 || login.length > 15) {
			toast('Логин должен быть от 3 до 15 символов')
			return
		}

		if (password.length < 3 || password.length > 70) {
			toast('Пароль должно быть от 3 до 15 символов')
			return
		}

		try {
			const response = await userService.registration(login, password, name)
			localStorage.setItem('token', response.data.accessToken)
			userContext?.setUser(response.data.user)
			toast('Регистрация успешна!')
		} catch (e) {
			if (e instanceof AxiosError) {
				toast(e.response?.data.message)
			} else {
				toast('Непредвиденная ошибка')
			}
		}
	}

	return (
		<form onSubmit={e => handleReg(e)}>
			<h2>Регистрация</h2>

			<input
				value={name}
				onChange={e => setName(e.target.value)}
				placeholder='Имя'
			/>
			<input
				value={login}
				onChange={e => setLogin(e.target.value)}
				placeholder='Логин'
				required
			/>
			<input
				value={password}
				onChange={e => setPassword(e.target.value)}
				placeholder='Пароль'
				required
				type='password'
			/>

			<button>Зарегистрироваться</button>

			<p>
				Есть аккаунт? <Link to='/login'>Войти</Link>
			</p>
		</form>
	)
}

export default Registration
