import { FC, useContext } from 'react'
import { UserContext } from '../Context'
import { Link } from 'react-router-dom'
import { UserRoles } from '../types/user.interface'

const Requests: FC = () => {
	const userContext = useContext(UserContext)

	return (
		<div>
			{(userContext?.user?.role === UserRoles.ADMIN ||
				userContext?.user?.role === UserRoles.MOD) && (
				<Link to='/' className='bttn main-bttn-requests'>
					Основная
				</Link>
			)}
			<h2>Заявки</h2>
		</div>
	)
}

export default Requests
