<template>
  <footer class="base-footer">
    <div class="footer__control">
      <RouterLink to="/" class="footer__logo" @click.prevent="logout">
        <img src="../../public/assets/images/logo-grey.svg">
      </RouterLink>
      <RouterLink to="/" class="control__politic-mobile">Политика конфиденциальности</RouterLink>
    </div>
    <div class="footer__control">
      <RouterLink to="/" class="control__politic-desktop">Политика конфиденциальности</RouterLink>
      <a href="mailto:pinkchicken@adaurum.ru" class="control__item mail">
        <img src="../../public/assets/icons/sms-icon.svg">
        pinkchicken@adaurum.ru
      </a>
      <div class="control__items-wrapper lang">
        <img src="../../public/assets/icons/global-icon.svg">
        <button :class="['control__item', { active: currentLang === lang.code }]" @click="changeLanguage(lang.code)" v-for="lang in languages" :key="lang.code">{{ lang.label }}</button>
      </div>
      <div class="control__items-wrapper contacts">
        <a href="tg:pinkchicken" class="items__social">
          <img src="../../public/assets/icons/tg-icon.svg">
        </a>
        <a href="whatsapp:pinkchicken" class="items__social">
          <img src="../../public/assets/icons/wa-icon.svg">
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import store from '../store/index.js'

const router = useRouter()

function logout() {
  store.commit('RESET_STATE')
  router.push('/')
}

const currentLang = ref('ru')
const languages = [
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'EN' },
  { code: 'tr', label: 'TUR' }
]
function changeLanguage(lang) {
  currentLang.value = lang
}
</script>

<style lang="scss" scoped>
.base-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 40px 120px;
  background: #EBEBEB;

  @media (max-width: 1350px) {
    padding: 40px;
  }

  @media (max-width: 1100px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  @media (max-width: 800px) {
    padding: 40px 20px;
  }

  .footer__logo {
    height: 32px;
    width: 220px;
  }

  @media (max-width: 1100px) {
    .contacts {order: 1;}
    .lang {order: 2;}
    .mail {order: 3;}
  }

  @media (max-width: 800px) {
    .lang {order: 2;}
    .mail {order: 3;}
    .contacts {order: 4;}
  }

  .footer__control {
    display: flex;
    align-items: center;
    gap: 65px;

    @media (max-width: 1350px) {
      gap: 30px;
    }

    @media (max-width: 800px) {
      flex-direction: column;
      align-items: flex-start;
    }

    .control__politic-desktop {
      cursor: pointer;
      display: flex;
      align-items: center;
      border: none;
      background: none;
      color: rgb(82, 82, 82);
      font-size: 15px;
      font-weight: 500;
      line-height: 145%;
      letter-spacing: 0%;
      text-align: left;
      text-decoration: none;

      @media (max-width: 1100px) {
        display: none;
      }

      @media (max-width: 800px) {
        display: flex;
        order: 1;
      }
    }

    .control__politic-mobile {
      display: none;

      @media (max-width: 1100px) {
        cursor: pointer;
        display: flex;
        align-items: center;
        border: none;
        background: none;
        color: rgb(82, 82, 82);
        font-size: 15px;
        font-weight: 500;
        line-height: 145%;
        letter-spacing: 0%;
        text-align: left;
        text-decoration: none;
      }

      @media (max-width: 800px) {
        display: none;
      }
    }

    .control__item {
      cursor: pointer;
      display: flex;
      align-items: center;
      border: none;
      background: none;
      color: rgb(82, 82, 82);
      font-size: 15px;
      font-weight: 500;
      line-height: 145%;
      letter-spacing: 0%;
      text-align: left;
      text-decoration: none;
      gap: 8px;

      &.active {
        color: rgb(238, 38, 194);
      }
    }

    .control__items-wrapper {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .items__social {
      width: 40px;
      height: 40px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>