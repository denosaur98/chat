<template>
  <div class="chat-page">
    <BaseSidebar :filesData="store.state.filesData"/>
    <ChatWindow :filesData="store.state.filesData"/>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import store from '../store/index'
import BaseSidebar from '../components/BaseSidebar'
import ChatWindow from '../components/ChatWindow'

onMounted(async () => {
  await store.dispatch('fetchFiles')
})
</script>

<style lang="scss" scoped>
.chat-page {
  display: flex;
  align-items: center;
  padding: 0 120px 60px;
  width: 100%;
  flex: 1;
  gap: 30px;

  @media (max-width: 1350px) {
    padding: 0 40px 60px;
  }

  @media (max-width: 1100px) {
    flex-direction: column;
  }

  @media (max-width: 800px) {
    padding: 0 20px 60px;
  }
}
</style>