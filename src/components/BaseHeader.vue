<template>
  <header class="base-header" v-if="store.state.isAuthorized">
    <RouterLink to="/" @click.prevent="logout">
      <img src="../../public/assets/images/logo.svg" class="header__logo">
    </RouterLink>
    <div class="header__control">
      <div class="control__user-info">
        <div class="control__items card">
          <img src="../../public/assets/icons/card-icon.svg">
          <p>5% <span>выручки</span></p>
        </div>
        <div class="control__items user">
          <img src="../../public/assets/icons/user-icon.svg">
          <RouterLink to="/chat" v-if="store.state.userData?.mail">{{ store.state.userData.mail }}</RouterLink>
        </div>
      </div>
      <div class="control__items">
        <button class="items__button" @click="togglePopup">
          <img src="../../public/assets/icons/setting-icon.svg">
        </button>
        <RouterLink to="/" class="items__button" @click.prevent="logout">
          <img src="../../public/assets/icons/logout-icon.svg">
        </RouterLink>
        <BasePopup :isOpen="isPopupOpen" @close="closePopup">
          <button @click="closePopup">Редактировать профиль</button>
          <button @click="closePopup">Загрузить аватар</button>
        </BasePopup>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import store from '../store/index.js'
import BasePopup from './BasePopup.vue'

const router = useRouter()

function logout() {
  store.commit('RESET_STATE')
  router.push('/')
}

const isPopupOpen = ref(false)
function togglePopup() {
  isPopupOpen.value = !isPopupOpen.value
}
function closePopup() {
  isPopupOpen.value = false
}
</script>

<style lang="scss" scoped>
.base-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 120px;
  width: 100%;

  @media (max-width: 1350px) {
    padding: 40px;
  }

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    padding: 40px 20px;
  }

  .header__logo {
    height: 32px;
    width: 220px;
  }

  .header__control {
    display: flex;
    align-items: center;
    gap: 25px;

    @media (max-width: 800px) {
      width: 100%;
    }

    .control__user-info {
      display: flex;
      align-items: center;
      gap: 25px;
    
      @media (max-width: 800px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
      }
    }

    .control__items {
      position: relative;
      display: flex;
      align-items: center;
      gap: 8px;

      &:last-child {

        @media (max-width: 800px) {
          margin-left: auto;
        }
      }

      &.card {

        @media (max-width: 800px) {
          order: 2;

          p {
            display: flex;
            color: rgb(121, 121, 121);
            font-size: 12px;
            font-weight: 500;
            line-height: 15px;
            text-align: left;
            gap: 5px;

            span {display: flex;}
          }
        }
      }

      &.user {
        @media (max-width: 800px) {
          order: 1;
        }
      }

      img {
        width: 40px;
        height: 40px;

        @media (max-width: 800px) {
          display: none;
        }
      }

      a, p {
        color: rgb(0, 0, 0);
        font-size: 18px;
        font-weight: 600;
        line-height: 22px;
        letter-spacing: 0%;
        text-align: left;
        text-decoration: none;

        span {display: none;}
      }

      .items__button {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background: rgb(255, 255, 255);
        border-radius: 50%;
        border: none;

        @media (max-width: 800px) {
          background: rgb(245, 245, 245);
        }

        img {
          display: flex;
          width: 25px;
          height: 25px;
        }
      }
    }
  }
}
</style>