<template>
  <Transition name="fade">
    <div class="errors-wrapper" v-if="normalizedErrors.length > 0">
      <p class="error-message" v-for="(error, index) in normalizedErrors" :key="index">
        {{ error }}
      </p>
    </div>
  </Transition>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  errorMessage: {
    type: [String, Array],
    default: () => []
  }
})

const normalizedErrors = computed(() => {
  if (!props.errorMessage) return []
  if (Array.isArray(props.errorMessage)) return props.errorMessage
  return [props.errorMessage]
})
</script>

<style lang="scss" scoped>
.errors-wrapper {
  display: flex;
  flex-direction: column;
  gap: 5px;

  .error-message {
    font-size: 15px;
    color: rgb(194, 42, 42);
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