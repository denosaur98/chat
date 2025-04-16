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
  justify-content: space-between;
  padding: 0 120px;
  width: 100%;
  height: 100%;
}
</style>