<template>
  <div class="dropzone-background">
    <Background :size="1" :gap="10" pattern-color="#BDBDBD" />
    <div class="overlay">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Background } from '@vue-flow/background'
</script>

<style scoped>

</style>
