<template>
  <div class="app">
    <BaseHeader />
    <main class="app-content">
      <RouterView />
    </main>
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
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
  width: 100%;
  min-height: 100vh;
}

.app-content {
  flex: 1;
}
</style>