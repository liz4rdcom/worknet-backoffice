<template>
  <div id="app">
    <nav-bar :loggedIn="loggedIn"></nav-bar>

    <b-row class="side-bar-content-container">
      <b-col cols="auto" v-if="loggedIn" class="side-bar-container">
        <div class="side-bar">
          <b-nav vertical tabs pills class="side-bar-nav-tabs">
            <b-nav-item href="#/user-search">მომხმარებლები</b-nav-item>
            <b-nav-item href="#/vacancy-search">ვაკანსიები</b-nav-item>
            <b-nav-item href="#/position-to-ISCO-relations">პოზიციები/ISCO, დაკავშირება</b-nav-item>
          </b-nav>
        </div>
      </b-col>

      <b-col class="content-container">
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
html {
  height: 100%;
}
body {
  height: 100%;
  background: #ebeff2;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.side-bar-content-container {
  margin-left: 0px;
  margin-right: 0px;
  height: calc(100% - 56px);
}
.side-bar-container {
  padding-left: 0px;
  padding-right: 0px;
  height: 100%;
}
.side-bar {
  height: 100%;
  background: #ffffff;
  border-right: 1px solid #e7e7e7;
  padding: 35px 30px;
  text-align: left;
}
.side-bar-nav-tabs {
  border-bottom: 0px;
}
.content-container {
  padding-left: 10px;
  padding-right: 10px;
  height: 100%;
  overflow: auto;
}
</style>
