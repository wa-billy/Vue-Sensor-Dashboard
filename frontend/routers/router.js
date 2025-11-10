import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import MySensor from '../pages/MySensor.vue'
import Contact from '../pages/Contact.vue'
import About from '../pages/About.vue'
import Settings from '../pages/Settings.vue'
import Login from '../pages/Login.vue'
import Profile from '../pages/Profile.vue'
import Notfound from '../pages/Notfound.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { title: 'Home Page(Show Only Admin Chart)' }
    },
    {
        path: '/mysensor',
        name: 'My Sensor',
        component: MySensor,
        meta: { title: 'My Sensor' }
    },
    {
        path: '/contact',
        name: 'Contact',
        component: Contact,
        meta: { title: 'Contact Page' }
    },
    {
        path: '/about',
        name: 'About us',
        component: About,
        meta: { title: 'Information of college' }
    },
    {
        path: '/setting',
        name: 'Settings',
        component: Settings,
        meta: { title: 'Settings' }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: { title: 'Profile' }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { title: 'Login Page' }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: Notfound
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            { top: 0 }
        }
    }
})