<template>
  <div id="app">
    <nav-bar></nav-bar>

    <b-row>
      <b-col cols="3">
        <b-card>
          <b-nav vertical tabs pills>
            <b-nav-item href="#/user-search">მომხმარებლები</b-nav-item>
            <b-nav-item href="#/vacancy-search">ვაკანსიები</b-nav-item>
          </b-nav>
        </b-card>
      </b-col>

      <b-col cols="9">
          <router-view ></router-view>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import navBar from './components/nav-bar'

export default {
  name: 'App',
  components: {
    'nav-bar': navBar,
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
