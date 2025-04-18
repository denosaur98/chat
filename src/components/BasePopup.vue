<template>
  <Transition name="fade">
    <div v-if="props.isOpen" v-click-outside="handleClickOutside" class="popup-container">
      <slot></slot>
    </div>
  </Transition>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['close'])

function handleClickOutside() {
  emit('close')
}
</script>

<style lang="scss" scoped>
.popup-container {
  position: absolute;
  display: flex;
  flex-direction: column;
  padding: 15px 30px;
  width: max-content;
  gap: 10px;
  border-radius: 8px;
  box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.08);
  top: 50px;
  right: 0;
  z-index: 999;
  background: #fff;

  :deep(a), :deep(button) {
    cursor: pointer;
    border: none;
    background: none;
    color: rgb(0, 0, 0);
    font-size: 16px;
    font-weight: 500;
    line-height: 19px;
    text-align: right;
    width: 100%;

    &:hover {
      color: rgb(238, 38, 194);
      transition: .2s;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>