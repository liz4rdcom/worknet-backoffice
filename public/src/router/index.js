import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import userSearch from '../components/userSearch/user-search'
import vacancySearch from '../components/vacancySearch/vacancy-search'
import login from '../components/um/login'

Vue.use(Router)

export default new Router({
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
  ],
})
