import { FC } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaLink, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa'
import { useAuth } from '../hooks/useAuth'
import { removeTokenFromLocalStorage } from '../helpers/localstorage.helper'
import { useAppDispatch } from '../store/hooks'
import { logout } from '../store/user/userSlice'
import { toast } from 'react-toastify'

const Header: FC = () => {
	const isAuth = useAuth()
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const logoutHandler = () => {
		dispatch(logout())
		removeTokenFromLocalStorage('token')
		toast.success('Вы успешно вышли из аккаунта!')
		navigate('/')
	}

	return (
		<header className="flex items-center bg-slate-800 p-4 shadow-sm blackdrop-blur-sm">
			<Link to="/">
				<FaLink size={20} />
			</Link>

			{/* Menu */}
			{isAuth && (
				<nav className="ml-auto mr-10">
					<ul className="flex items-center gap-5">
						<li>
							<NavLink
								to={'/'}
								className={({ isActive }) =>
									isActive ? 'text-white' : 'text-white/50'
								}
							>
								Главная страница
							</NavLink>
						</li>
						<li>
							<NavLink
								to={'/dashboard'}
								className={({ isActive }) =>
									isActive ? 'text-white' : 'text-white/50'
								}
							>
								Дашборд
							</NavLink>
						</li>
					</ul>
				</nav>
			)}

			{/* Actions */}
			{isAuth ? (
				<button className="btn btn-red" onClick={logoutHandler}>
					<span>Выйти</span>
					<FaSignOutAlt />
				</button>
			) : (
				<Link
					className="btn btn-green py-2 hover:text-white ml-auto"
					to={'auth'}
				>
					<span>Логин / Регистрация</span>
					<FaSignInAlt />
				</Link>
			)}
		</header>
	)
}

export default Header
