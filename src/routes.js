import { HomePage } from './pages/home-page.jsx'
import { AboutPage } from './pages/about-page.jsx'
import { ToyApp } from './pages/toy-app.jsx'
import { ToyDashboard } from './pages/toy-dashboard.jsx'
import { ToyDetails } from './pages/toy-details.jsx'
import { ToyEdit } from './pages/toy-edit.jsx'
import { Login } from './pages/login-signup.jsx'

const routes = [
    {
        path: '/toy/dashboard',
        component: ToyDashboard,
    },
    {
        path: '/toy/edit/:toyId',
        component: ToyEdit,
    },
    {
        path: '/toy/:toyId',
        component: ToyDetails,
    },
    {
        path: '/about',
        component: AboutPage,
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/toy',
        component: ToyApp,
    },
    {
        path: '/',
        component: HomePage,
    },
]

export default routes;