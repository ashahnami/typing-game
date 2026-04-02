<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>

<template>
  <footer>
    <div class="footer-links">
      <a href="https://github.com/ashahnami/typing-game" target="_blank" class="group">
        <Icon icon="line-md:github" width="24"/>
        <p>Github</p>
      </a>
    </div>
  </footer>
</template>

<style scoped>
footer {
  text-align: center;
  font-weight: 600;
}

.footer-links {
  display: flex;
  flex-direction: row;
}

.group {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
}
</style>
