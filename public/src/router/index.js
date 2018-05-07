import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import UserSearch from '../components/userSearch/user-search'

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
      path: '/user-search',
      name: 'user-search',
      component: UserSearch,
    },
    {
      path: '/vacancy-search',
      name: 'vacancy-search',
      component: HelloWorld,
    },
  ],
})
