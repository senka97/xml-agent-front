import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../components/HomePage.vue'
import LoginPage from '../components/LoginPage.vue'
import RegistrationPage from '../components/RegistrationPage.vue'
import NewAd from '../components/NewAd.vue'
import ReserveCar from '../components/ReserveCar.vue'
import Statistic from '../components/Statistic.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'HomePage',
            component: HomePage
        },
        {
            path: '/login',
            name: 'LoginPage',
            component: LoginPage
        },
        {
            path: '/registration',
            name: 'RegistrationPage',
            component: RegistrationPage
        },
        {
            path: '/newAd',
            name: 'NewAd',
            component: NewAd
        },
        {
            path: '/reserveCar',
            name: 'ReserveCar',
            component: ReserveCar
        },
        {
            path: '/statistic',
            name: 'Statistic',
            component: Statistic
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})