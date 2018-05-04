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
    </b-collapse>
  </b-navbar>
 <password-change ref="modalRef"></password-change>
</div>
</template>

<script>
export default {
  name: 'navbar',
  data: () => ({}),
  created () {},
  methods: {},
  components: {},
}
</script>

<style scoped>
.navbar {
  background-color: blue;
}
</style>
