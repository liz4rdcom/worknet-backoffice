import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import UserSearch from '../components/UserSearch/user-search'
import users from '../components/users'

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
    {
      path: '/users-list',
      name: 'users-list',
      component: users,
    },
  ],
})
