<template>
  <div class="auth-page">
    <h1>Авторизация</h1>
    <div class="auth__inputs">
      <input placeholder="Введите логин:" v-model="login">
      <input placeholder="Введите почту:" v-model="mail">
    </div>
    <RouterLink to="/chat" @click="loggedIn">Войти</RouterLink>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import store from '../store/index';

const login = ref('')
const mail = ref('')

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

  h1 {
    color: rgb(0, 0, 0);
    font-size: 35px;
    font-weight: 600;
    line-height: 29px;
    letter-spacing: 0%;
    text-align: left;
    margin-bottom: 50px;
  }

  .auth__inputs {
    display: flex;
    flex-direction: column;
    width: 500px;
    gap: 20px;
    margin-bottom: 30px;

    @media (max-width: 800px) {
      width: 100%;
      padding: 20px;
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
  }
}
</style>