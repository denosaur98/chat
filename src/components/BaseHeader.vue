<template>
  <header class="base-header">
    <RouterLink to="/">
      <img src="../assets/images/logo.svg" class="header__logo">
    </RouterLink>
    <div class="header__control">
      <div class="control__items">
        <img src="../assets/icons/card-icon.svg">
        <p>5%</p>
      </div>
      <div class="control__items">
        <img src="../assets/icons/user-icon.svg">
        <RouterLink to="/">Username@adaurum.ru</RouterLink>
      </div>
      <div class="control__items">
        <RouterLink to="/" class="items__button">
          <img src="../assets/icons/setting-icon.svg">
        </RouterLink>
        <RouterLink to="/" class="items__button">
          <img src="../assets/icons/logout-icon.svg">
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.base-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 120px;
  width: 100%;

  .header__logo {
    height: 32px;
    width: 220px;
  }

  .header__control {
    display: flex;
    align-items: center;
    gap: 25px;

    .control__items {
      display: flex;
      align-items: center;
      gap: 8px;

      img {
        width: 40px;
        height: 40px;
      }

      a, p {
        color: rgb(0, 0, 0);
        font-size: 18px;
        font-weight: 600;
        line-height: 22px;
        letter-spacing: 0%;
        text-align: left;
        text-decoration: none;
      }

      .items__button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background: rgb(255, 255, 255);
        border-radius: 50%;

        img {
          width: 25px;
          height: 25px;
        }
      }
    }
  }
}
</style>