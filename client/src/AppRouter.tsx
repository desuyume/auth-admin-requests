import { FC, useContext } from 'react'
import { UserContext } from './Context'
import { Navigate, Route, Routes } from 'react-router-dom'
import { adminRoutes, privateRoutes, publicRoutes } from './router/routes'
import Loader from './Loader'
import { UserRoles } from './types/user.interface'

const AppRouter: FC = () => {
	const userContext = useContext(UserContext)

	return !userContext?.isFetched ? (
		<div>
			<Loader />
		</div>
	) : (
		<Routes>
			{!userContext?.user && (
				<>
					{publicRoutes.map(route => (
						<Route key={route.path} path={route.path} element={route.element} />
					))}
					<Route path='*' element={<Navigate to='/login' />} />
				</>
			)}

			{userContext?.user && userContext?.user?.role === UserRoles.USER && (
				<>
					{privateRoutes.map(route => (
						<Route key={route.path} path={route.path} element={route.element} />
					))}
					<Route path='*' element={<Navigate to='/' />} />
				</>
			)}

			{userContext?.user && userContext?.user?.role === UserRoles.ADMIN && (
				<>
					{adminRoutes.map(route => (
						<Route key={route.path} path={route.path} element={route.element} />
					))}
					<Route path='*' element={<Navigate to='/' />} />
				</>
			)}

			{userContext?.user && userContext?.user?.role === UserRoles.MOD && (
				<>
					{adminRoutes.map(route => (
						<Route key={route.path} path={route.path} element={route.element} />
					))}
					<Route path='*' element={<Navigate to='/' />} />
				</>
			)}
		</Routes>
	)
}

export default AppRouter
