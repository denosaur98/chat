<template>
  <div class="app">
    <BaseHeader />
    <RouterView />
    <BaseFooter />
  </div>
</template>

<script setup>
import BaseHeader from './components/BaseHeader'
import BaseFooter from './components/BaseFooter'

</script>

<style>
@font-face {
  font-family: Inter;
  src: url('/public/assets/fonts/Inter.ttf');
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Inter;
}

.app {
  background: #f5f5f5;
  width: 100%;
  height: 100%;
  min-height: 100vh;
}
</style>