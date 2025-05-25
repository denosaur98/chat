<template>
  <div class="auth-page">
    <div type="submit" class="auth__inputs">
      <div class="auth__buttons-switch">
        <button :class="!isAuth ? 'active' : ''" @click="switchReg">Зарегистрироваться</button>
        <button :class="isAuth ? 'active' : ''" @click="switchAuth">Войти</button>
      </div>
      <form @submit.prevent="isAuth ? loginUser() : registration()" class="inputs-wrapper">
        <input placeholder="Введите логин:" v-model="name" v-if="!isAuth">
        <input placeholder="Введите почту:" v-model="email">
        <input placeholder="Введите пароль:" v-model="password" type="password">
        <ErrorMessages :errorMessage="errorMessage"/>
        <button type="submit" class="auth__link">{{ isAuth ? 'Войти' : 'Зарегистрироваться' }}</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import store from '../store/index';
import ErrorMessages from '../components/ErrorMessages';

const router = useRouter()

const errorMessage = ref([])

const isAuth = ref(false)
function switchAuth() {
  errorMessage.value = ''
  isAuth.value = true
}
function switchReg() {
  errorMessage.value = ''
  isAuth.value = false
}

const name = ref('')
const email = ref('')
const password = ref('')

async function registration() {
  try {
    errorMessage.value = ''
    const response = await store.dispatch('registration', {
      name: name.value,
      email: email.value,
      password: password.value
    })

    if (response) {
      loggedIn()
      router.push('/chat')
    }
  } catch {
    errorMessage.value = store.state.loginErrorMessage
  }
}
async function loginUser() {
  try {
    errorMessage.value = ''
    const response = await store.dispatch('auth', { email: email.value, password: password.value })

    if (response) {
      loggedIn()
      router.push('/chat')
    }
  } catch {
    errorMessage.value = store.state.loginErrorMessage
  }
}

function loggedIn() {
  store.commit('SET_AUTH', {
    isAuthorized: true,
    userData: {
      name: name.value,
      email: email.value
    }
  })
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
    position: relative;
    display: flex;
    flex-direction: column;
    width: 500px;
    min-height: 370px;
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

    .inputs-wrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 15px;
      min-height: 350px;

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

      .auth__link {
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
        margin-top: auto;
      }
    }
  }
}
</style>