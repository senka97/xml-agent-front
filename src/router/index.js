import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../components/HomePage.vue'
import LoginPage from '../components/LoginPage.vue'
import RegistrationPage from '../components/RegistrationPage.vue'
import NewAd from '../components/NewAd.vue'
import VehicleDetails from '../components/VehicleDetails.vue'
import Cart from '../components/Cart.vue'

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
            path: '/vehicle/details',
            name: 'VehicleDetails',
            component: VehicleDetails
        },
        {
            path: '/cart',
            name: 'Cart',
            component: Cart
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})