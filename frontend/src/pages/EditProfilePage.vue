<template>
  <div class="edit-profile-page">
    <h1>Редактирование данных</h1>
    <form @submit.prevent="saveChanges" class="profile__inputs-wrapper">
      <div class="item__input">
        <h2>{{ store.state.userData?.name }}</h2>
        <input placeholder="Введите новый логин:" v-model="name">
      </div>
      <div class="item__input">
        <h2>{{ store.state.userData?.email }}</h2>
        <input placeholder="Введите новую почту:" v-model="email">
      </div>
      <div class="item__input">
        <input placeholder="Введите новый пароль:" v-model="password" type="password">
      </div>
      <div class="upload__avatar-wrapper">
        <label for="upload">Загрузить</label>
        <input class="inputs__file-btn" type="file" id="upload">
      </div>
      <ErrorMessages :errorMessage="errorMessage" />
      <button type="submit">Сохранить</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import store from '../store/index.js';
import ErrorMessages from '../components/ErrorMessages';

const errorMessage = ref([])

const name = ref('')
const email = ref('')
const password = ref('')

async function saveChanges() {
  try {
    errorMessage.value = ''

    await store.dispatch('update', {
      name: name.value,
      email: email.value,
      password: password.value
    })
  } catch {
    errorMessage.value = store.state.loginErrorMessage
  }
}
</script>

<style lang="scss" scoped>
.edit-profile-page {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;

  h1 {
    color: rgb(0, 0, 0);
    font-size: 20px;
    font-weight: 600;
    line-height: 29px;
    letter-spacing: 0%;
    text-align: left;
    margin-bottom: 30px;
  }

  .profile__inputs-wrapper {
    display: flex;
    flex-direction: column;
    width: 500px;
    min-height: 500px;
    gap: 20px;

    @media (max-width: 800px) {
      width: 100%;
      padding: 20px;
    }

    .item__input {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 70px;
      gap: 10px;

      h2 {
        font-size: 15px;
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

    .upload__avatar-wrapper {
      display: flex;
      align-items: center;

      label {
        cursor: pointer;
        font-size: 15px;
        padding: 10px 15px;
        border: 2px solid rgba(0, 0, 0, 0.5);
        box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        width: max-content;
        background: none;
      }

      .inputs__file-btn {
        border: none;

        &::-webkit-file-upload-button {
          display: none !important;
        }

        &::file-selector-button {
          display: none !important;
        }
      }
    }

    button {
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
</style>