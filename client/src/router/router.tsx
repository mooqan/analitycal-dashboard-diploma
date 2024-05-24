import { createBrowserRouter } from 'react-router-dom'
import Layout from '../pages/Layout'
import ErrorPage from '../pages/ErrorPage'
import Home from '../pages/Home'
import Urls, { urlsAction } from '../pages/Urls'
import Auth from '../pages/Auth'
import Profile from '../pages/Profile'
import { ProtectedRoute } from '../components/ProtectedRoute'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: 'urls',
				action: urlsAction,
				element: (<ProtectedRoute>
					<Urls />
				</ProtectedRoute>
				),
			},
            {
                path: 'auth',
                element: <Auth />,
            },
			{
                path: 'profile',
                element: (<ProtectedRoute>
					<Profile />
				</ProtectedRoute>
				),
            },
		],
	},
])
