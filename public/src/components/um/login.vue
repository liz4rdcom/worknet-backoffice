<template>
  <div>
    <h1 class="welcome-element">შედით თქვენს პროფილში</h1>
    <b-card class="login" @keyup.enter="login">
      <b-form-group label="მომხმარებლის სახელი / იმეილი">
        <b-form-input id="login-username" autofocus v-model="userNameOrEmail" type="text"></b-form-input>
      </b-form-group>
      <b-form-group label="პაროლი">
        <b-form-input id="login-password" v-model="password" type="password"></b-form-input>
      </b-form-group>
      <b-button variant="primary" @click="login">
        შესვლა
      </b-button>
    </b-card>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import utils from '../../utils'
import { bus } from '../common/bus'

export default {
  name: 'login',
  data: () => ({
    userNameOrEmail: '',
    password: '',
  }),
  methods: {
    async login () {
      let loginObj = { password: this.password }

      if (!utils.isValidEmail(this.userNameOrEmail)) {
        loginObj.userName = this.userNameOrEmail
      } else {
        loginObj.email = this.userNameOrEmail
      }

      try {
        let response = await this.$http.post('/um/login', loginObj, {needsToken: false})

        Cookies.set('token', response.data)

        bus.$emit('login')

        this.$router.push('/user-search')
      } catch (error) {
      }
    },
  },
}
</script>

<style scoped>
.login {
  max-width: 30%;
  margin: auto;
  margin-top: 30px;
}
.welcome-element {
  margin-top: 20px;
}
</style>
