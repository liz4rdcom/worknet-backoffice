<template>
<div>
  <b-navbar toggleable="md" type="dark" variant="info">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="#/user-search">Worknet Back Office Portal</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">
      <!-- <b-navbar-nav>
        <b-nav-item href="#">name 1</b-nav-item>
        <b-nav-item href="#">name 2</b-nav-item>
      </b-navbar-nav> -->

      <!-- <b-navbar-nav class="ml-auto">
        <b-nav-item href="#">name 3</b-nav-item>
      </b-navbar-nav> -->
      <b-navbar-nav class="ml-auto">
        <b-navbar-nav>
          <!-- <b-nav-item v-if="!loggedIn" href="#/login">შესვლა</b-nav-item> -->
          <!-- <b-nav-item v-if="!loggedIn" href="#/register">რეგისტრაცია</b-nav-item> -->
        </b-navbar-nav>
        <b-nav-item-dropdown id="nav-bar-user-operations-dropdown" v-if="loggedIn" text="" right>
          <!-- <b-dropdown-item id="show-modal" @click="modalTrue">პაროლის შეცვლა</b-dropdown-item> -->
          <b-dropdown-item @click="logout">გასვლა</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
import { bus } from './common/bus'

export default {
  name: 'navbar',
  props: ['loggedIn'],
  created () {},
  methods: {
    logout () {
      bus.$emit('logout')

      this.$router.push('/login')
    },
  },
  components: {},
}
</script>

<style scoped>
.navbar {
  background-color: blue;
}
</style>
