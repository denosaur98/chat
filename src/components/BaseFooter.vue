<template>
  <footer class="base-footer">
    <RouterLink to="/" class="footer__logo">
      <img src="../../public/assets/images/logo-grey.svg">
    </RouterLink>
    <div class="footer__control">
      <RouterLink to="/" class="control__item">Политика конфиденциальности</RouterLink>
      <RouterLink to="/" class="control__item">
        <img src="../../public/assets/icons/sms-icon.svg">
        pinkchicken@adaurum.ru
      </RouterLink>
      <div class="control__items-wrapper">
        <img src="../../public/assets/icons/global-icon.svg">
        <button class="control__item active">RU</button>
        <button class="control__item">EN</button>
        <button class="control__item">TUR</button>
      </div>
      <div class="control__items-wrapper">
        <RouterLink to="/" class="items__social">
          <img src="../../public/assets/icons/tg-icon.svg">
        </RouterLink>
        <RouterLink to="/" class="items__social">
          <img src="../../public/assets/icons/wa-icon.svg">
        </RouterLink>
      </div>
    </div>
  </footer>
</template>

<script setup>

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

  .footer__logo {
    height: 32px;
    width: 220px;
  }

  .footer__control {
    display: flex;
    align-items: center;
    gap: 65px;

    @media (max-width: 1350px) {
      gap: 30px;
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