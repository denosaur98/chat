<template>
  <div class="chat-page">
    <BaseSidebar/>
    <ChatWindow/>
  </div>
</template>

<script setup>
import BaseSidebar from '../components/BaseSidebar'
import ChatWindow from '../components/ChatWindow'

</script>

<style lang="scss" scoped>
.chat-page {
  display: flex;
  align-items: center;
  padding: 0 120px 60px;
  width: 100%;
  flex: 1;
  gap: 30px;
}
</style>