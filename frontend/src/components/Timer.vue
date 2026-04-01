<script setup lang="ts">
import { useGameStore } from '@/stores/game'

const store = useGameStore();
</script>

<template>
    <div class="time">{{ store.timeRemaining }}</div>
</template>

<style scoped>
.time {
    font-size: 1.5rem;
}
</style>