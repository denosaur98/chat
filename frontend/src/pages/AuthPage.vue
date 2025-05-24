<template>
  <div class="auth-page">
    <div class="auth__inputs">
      <div class="auth__buttons-switch">
        <button :class="!isAuth ? 'active' : ''" @click="switchReg">Зарегистрироваться</button>
        <button :class="isAuth ? 'active' : ''" @click="switchAuth">Войти</button>
      </div>
      <div class="inputs-wrapper">
        <input placeholder="Введите логин:" v-model="login" v-if="!isAuth">
        <input placeholder="Введите почту:" v-model="mail">
        <input placeholder="Введите пароль:" v-model="password" type="password">
        <Transition name="fade">
          <div class="errors-wrapper" v-if="errorMessage.length > 0">
            <p class="error-message"  v-for="(error, index) in errorMessage" :key="index">{{ error }}</p>
          </div>
        </Transition>
      </div>
      <RouterLink to="/chat" @click.prevent="isAuth ? loginUser() : registration()" class="auth__link">{{ isAuth ? 'Войти' : 'Зарегистрироваться' }}</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import store from '../store/index';

const router = useRouter()

const errorMessage = ref([])
function normalizeErrors(err) {
  if (!err) return []
  if (Array.isArray(err)) return err
  return [err]
}

const isAuth = ref(false)
function switchAuth() {
  errorMessage.value = ''
  isAuth.value = true
}
function switchReg() {
  errorMessage.value = ''
  isAuth.value = false
}

const login = ref('')
const mail = ref('')
const password = ref('')

async function registration() {
  try {
    errorMessage.value = ''
    const response = await store.dispatch('registration', {
      name: login.value,
      mail: mail.value,
      password: password.value
    })

    if (response) {
      loggedIn()
      router.push('/chat')
    }
  } catch {
    errorMessage.value = normalizeErrors(store.state.loginErrorMessage)
  }
}
async function loginUser() {
  try {
    errorMessage.value = ''
    const response = await store.dispatch('auth', { mail: mail.value, password: password.value })

    if (response) {
      loggedIn()
      router.push('/chat')
    }
  } catch {
    errorMessage.value = normalizeErrors(store.state.loginErrorMessage)
  }
}

function loggedIn() {
  store.commit('SET_AUTH', {
    isAuthorized: true,
    userData: {
      login: login.value,
      mail: mail.value
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

      .errors-wrapper {
        display: flex;
        flex-direction: column;
        gap: 5px;
        margin-top: auto;

        .error-message {
          font-size: 15px;
          color: rgb(194, 42, 42);
        }
      }
    }

    .auth__link {
      margin-top: auto;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>