<template>
  <div class="any-group">{{ state.name }}</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
const state = reactive({ name: 'fry' })
</script>

<style lang="scss" scoped>
.any-group {
  display: flex;
}
</style>
