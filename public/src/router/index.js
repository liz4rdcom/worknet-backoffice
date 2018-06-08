import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import occupationToISCORelations from '@/components/occupation-to-ISCO-relations'
import userSearch from '../components/userSearch/user-search'
import vacancySearch from '../components/vacancySearch/vacancy-search'
import login from '../components/um/login'
import Cookies from 'js-cookie'
import { bus } from '../components/common/bus'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/user-search',
    },
    {
      path: '/hello-world',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/user-search',
      name: 'user-search',
      component: userSearch,
    },
    {
      path: '/vacancy-search',
      name: 'vacancy-search',
      component: vacancySearch,
    },
    {
      path: '/occupation-to-ISCO-relations',
      name: 'occupation-to-ISCO-relations',
      component: occupationToISCORelations,
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  if (!Cookies.get('token')) {
    bus.$emit('logout')

    if (to.path === '/login') {
      next()

      return
    }

    next('/login')
    return
  }

  if (to.path === '/login') {
    next('/user-search')

    return
  }

  next()
})

export default router
