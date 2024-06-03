<template>
  <div class="page-container">{{ state.name }}</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
const state = reactive({ name: 'fry' })
</script>

<style lang="scss" scoped>
.page-container {
  color: red;
  display: flex;
}
</style>
