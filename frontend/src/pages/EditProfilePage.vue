<template>
  <div class="edit-profile-page">
    <h1>Редактирование данных</h1>
    <div class="profile__inputs-wrapper">
      <input placeholder="Введите логин:" v-model="login">
      <input placeholder="Введите почту:" v-model="mail">
      <input placeholder="Введите пароль:" v-model="password" type="password">
      <div class="upload__avatar-wrapper">
        <label for="upload">Загрузить</label>
        <input class="inputs__file-btn" type="file" id="upload">
      </div>
      <button>Сохранить</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const login = ref('')
const mail = ref('')
const password = ref('')
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
    min-height: 370px;
    gap: 20px;

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