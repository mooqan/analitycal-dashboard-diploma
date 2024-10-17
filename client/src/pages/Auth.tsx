import { FC, useState } from 'react'
import { AuthService } from '../services/auth.service'
import { toast } from 'react-toastify'
import { setTokenToLocalStorage } from '../helpers/localstorage.helper'
import { useAppDispatch } from '../store/hooks'
import { login } from '../store/user/userSlice'
import { useNavigate } from 'react-router-dom'

const Auth: FC = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [isLogin, setIslogin] = useState<boolean>(false)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			const data = await AuthService.registration({ email, password })
			if (data) {
				toast.success('Аккаунт был успешно создан!')
				setIslogin(!isLogin)
			}
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error.toString())
		}
	}

	const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			const data = await AuthService.login({ email, password })

			if (data) {
				setTokenToLocalStorage('token', data.token)
				dispatch(login(data))
				toast.success('Вы залогинены!')
				navigate('/')
			}
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error.toString())
		}
	}

	return (
		<div className="mt-40 flex flex-col justify-center items-center bg-slate-900 text-white">
			<h1 className="mb-10 text-center text-xl">
				{isLogin ? 'Войти' : 'Регистрация'}
			</h1>

			<form
				onSubmit={isLogin ? loginHandler : registrationHandler}
				className="flex w-1/3 flex-col mx-auto gap-5"
			>
				<input
					type="text"
					className="input"
					placeholder="Почта"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					className="input"
					placeholder="Пароль"
					onChange={(e) => setPassword(e.target.value)}
				/>

				<button className="btn btn-green mx-auto">Подтвердить</button>
			</form>

			<div className="flex justify-center mt-5">
				{isLogin ? (
					<button
						onClick={() => setIslogin(!isLogin)}
						className="text-slate-300 hover:text-white"
					>
						Еще не зарегистрированы?
					</button>
				) : (
					<button
						onClick={() => setIslogin(!isLogin)}
						className="text-slate-300 hover:text-white"
					>
						Уже есть аккаунт?
					</button>
				)}
			</div>
		</div>
	)
}

export default Auth
