import { createBrowserRouter } from 'react-router-dom';
import Layout from '../pages/Layout';
import ErrorPage from '../pages/ErrorPage';
import Home from '../pages/Home';
import Auth from '../pages/Auth';
import Dashboard from '../pages/Dashboard'; 
import { ProtectedRoute } from '../components/ProtectedRoute';
import AnalysisReport from '../pages/AnalysisReport';

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
                path: 'auth',
                element: <Auth />,
            },
            {
                path: 'dashboard',
                element: (
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'analysis-report',
                element: (
                    <ProtectedRoute>
                        <AnalysisReport />
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);
