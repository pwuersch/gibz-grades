<script setup lang="ts">
import { NSpin, NSpace } from 'naive-ui';
</script>

<template>
  <n-space justify="center" class="container">
    <n-spin size="large" class="vertical-center" />
  </n-space>
</template>

<style scoped>
.container {
  height: 80vh;
  position: relative;
}

.vertical-center {
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
</style>
