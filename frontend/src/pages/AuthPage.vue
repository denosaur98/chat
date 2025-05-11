<template>
  <div class="auth-page">
    <div class="auth__inputs">
      <div class="auth__buttons-switch">
        <button :class="!isAuth ? 'active' : ''" @click="switchReg">Зарегистрироваться</button>
        <button :class="isAuth ? 'active' : ''" @click="switchAuth">Войти</button>
      </div>
      <input placeholder="Введите логин:" v-model="login">
      <input placeholder="Введите почту:" v-model="mail">
      <input placeholder="Введите пароль:" v-model="password">
      <RouterLink to="/chat" @click.prevent="isAuth ? loggedIn() : registration()">{{ isAuth ? 'Войти' : 'Зарегистрироваться' }}</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import store from '../store/index';

const isAuth = ref(false)

function switchAuth() {
  isAuth.value = true
}
function switchReg() {
  isAuth.value = false
}

const login = ref('')
const mail = ref('')
const password = ref('')

function registration() {
  const response = store.dispatch('registration', { name: login.value, mail: mail.value, password: password.value })
  if(response) {
    loggedIn()
  }
}
function loggedIn() {
  store.commit('SET_AUTH', { isAuthorized: true, userData: { login: login.value, mail: mail.value } })
}
</script>

<style lang="scss" scoped>
.auth-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 700px;

  .auth__inputs {
    display: flex;
    flex-direction: column;
    width: 500px;
    gap: 20px;

    @media (max-width: 800px) {
      width: 100%;
      padding: 20px;
    }

    .auth__buttons-switch {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      gap: 20px;
      margin-bottom: 30px;

      button {
        cursor: pointer;
        display: flex;
        align-items: center;
        background: none;
        border: none;
        color: rgb(0, 0, 0);
        font-size: 20px;
        font-weight: 600;
        line-height: 29px;
        letter-spacing: 0%;
        text-align: left;

        &.active {
          color: rgb(238, 38, 194);
        }
      }
    }

    input {
      outline: none;
      border: none;
      font-size: 15px;
      border-radius: 5px;
      width: 100%;
      padding: 10px 15px;

      @media (max-width: 800px) {
        border: 2px solid rgba(0, 0, 0, 0.5);
      }
    }
  }

  a {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 15px;
    color: rgb(0, 0, 0);
    font-size: 20px;
    font-weight: 600;
    line-height: 29px;
    letter-spacing: 0%;
    text-align: left;
    background: none;
    border: 2px solid rgba(0, 0, 0, 0.5);
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    text-decoration: none;
    width: 100%;
    margin-top: 30px;
  }
}
</style>