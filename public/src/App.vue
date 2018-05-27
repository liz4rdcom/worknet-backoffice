<template>
  <div id="app">
    <nav-bar :loggedIn="loggedIn"></nav-bar>

    <b-row>
      <b-col cols="3" v-if="loggedIn">
        <b-card>
          <b-nav vertical tabs pills>
            <b-nav-item href="#/user-search">მომხმარებლები</b-nav-item>
            <b-nav-item href="#/vacancy-search">ვაკანსიები</b-nav-item>
          </b-nav>
        </b-card>
      </b-col>

      <b-col :cols="loggedIn ? '9' : ''">
          <router-view ></router-view>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import navBar from './components/nav-bar'
import Cookies from 'js-cookie'
import { bus } from './components/common/bus'

export default {
  name: 'App',
  components: {
    'nav-bar': navBar,
  },
  data () {
    return {
      loggedIn: false,
    }
  },
  created () {
    this.loggedIn = !!Cookies.get('token')

    bus.$on('login', () => {
      this.loggedIn = true
    })

    bus.$on('logout', () => {
      this.loggedIn = false
      Cookies.remove('token')
    })
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
