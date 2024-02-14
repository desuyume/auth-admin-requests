import { FC, useContext, useEffect, useState } from 'react'
import { UserContext } from '../Context'
import { IFetchedUser, UserRoles } from '../types/user.interface'
import { Link } from 'react-router-dom'
import userService from '../services/user.service'
import Loader from '../Loader'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

const Admin: FC = () => {
	const userContext = useContext(UserContext)
	const [users, setUsers] = useState<IFetchedUser[]>([])
	const [isUsersLoading, setIsUsersLoading] = useState<boolean>(true)
	const [pageCount, setPageCount] = useState<number>(0)
	const [currentPage, setCurrentPage] = useState<number>(1)
	const limit = 5

	const getUsers = async () => {
		setIsUsersLoading(true)
		try {
			const users = await userService.getAllUsers(limit, currentPage)
			setUsers(users.data.users)
			setPageCount(Math.ceil(users.data.count / limit))
		} catch (e) {
			if (e instanceof AxiosError) {
				toast(e.response?.data.message)
			} else {
				toast('Непредвиденная ошибка')
			}
		} finally {
			setIsUsersLoading(false)
		}
	}

	const onChangeRoleHandler = async (
		e: React.ChangeEvent<HTMLSelectElement>,
		id: number
	) => {
		try {
			await userService.update(id, e.target.value)
		} catch (e) {
			if (e instanceof AxiosError) {
				toast(e.response?.data.message)
			} else {
				toast('Непредвиденная ошибка')
			}
		}
	}

	const deleteHandler = async (id: number) => {
		try {
			await userService.remove(id)
			await getUsers()
		} catch (e) {
			if (e instanceof AxiosError) {
				toast(e.response?.data.message)
			} else {
				toast('Непредвиденная ошибка')
			}
		}
	}

	useEffect(() => {
		getUsers()
	}, [currentPage])

	return (
		<div>
			<div className='users'>
				{isUsersLoading ? (
					<div className='loader-container'>
						<Loader />
					</div>
				) : (
					<div className='users-list'>
						{users.map(user => (
							<div className='user' key={user.id}>
								<p>
									ID - {user.id}. Имя - {user.name}. Логин - {user.login}
								</p>
								<div
									className={
										'user-control' +
										(user.id === userContext?.user?.id ? ' invisible' : '')
									}
								>
									<select
										onChange={e => onChangeRoleHandler(e, user.id)}
										defaultValue={user.role.role_name}
									>
										<option value='user'>user</option>
										<option value='mod'>mod</option>
										<option value='admin'>admin</option>
									</select>
									<button onClick={() => deleteHandler(user.id)}>
										Удалить
									</button>
								</div>
							</div>
						))}
					</div>
				)}
				<div className='user-nav'>
					<button
						className={currentPage <= 1 ? 'invisible' : ''}
						onClick={() => setCurrentPage(currentPage - 1)}
					>
						{'<'}
					</button>
					<button disabled>{currentPage}</button>

					<button
						onClick={() => setCurrentPage(currentPage + 1)}
						className={currentPage >= pageCount ? 'invisible' : ''}
					>
						{'>'}
					</button>
				</div>
			</div>

			{userContext?.user?.role === UserRoles.ADMIN && (
				<Link to='/' className='bttn main-bttn'>
					Основная
				</Link>
			)}
		</div>
	)
}

export default Admin
