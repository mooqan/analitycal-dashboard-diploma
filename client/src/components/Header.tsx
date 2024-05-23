import { FC } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaLink, FaSignOutAlt } from 'react-icons/fa'
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
        toast.success('You logged out.')
        navigate('/')
    }


  return (
  <header className='flex items-center bg-slate-800 p-4 shadow-sm blackdrop-blur-sm'>
    <Link to="/">
    <FaLink size={20} />
    </Link>

    {/* Menu */}
    {isAuth && (
        <nav className='ml-auto mr-10'>
            <ul className=" flex items-center gap-5">
                <li>
                    <NavLink to={'/'} className={({ isActive }) => 
                    isActive ? 'text-white' : 'text-white/50'
                }
                >
                    Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/urls'} className={({ isActive }) => 
                    isActive ? 'text-white' : 'text-white/50'
                }
                >Create new link</NavLink>
                </li>
                <li>
                    <NavLink to={'/profile'} className={({ isActive }) => 
                    isActive ? 'text-white' : 'text-white/50'
                }
                >Profile</NavLink>
                </li>
            </ul>
        </nav>
    )}

    {/* Actions */}
     {
        isAuth ? (
            <button className='btn btn-red' onClick={logoutHandler}>
                <span>Log Out</span>
                <FaSignOutAlt />
            </button>
        ) : (
            <Link className='py-2 text-white/50 hover:text-white ml-auto' to={'auth'}>
                Log In / Sign In
            </Link>
        )
     }
  </header>
  )
}

export default Header