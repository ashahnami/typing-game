<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import Footer from '@/components/Footer.vue'
</script>

<template>
  <div class="app-layout">
    <NavBar />
    <RouterView />
    <Footer />
  </div>
</template>

<style scoped>
.app-layout {
  display: grid;
  grid-auto-flow: row;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  width: 100%;
  max-width: 1000px;
  gap: 2rem;
  padding-top: 1rem;
  padding-bottom: 1.5rem;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  padding: 0.8rem 1rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    font-size: 1rem;
    padding: 0.8rem 1rem;
  }
}
</style>
