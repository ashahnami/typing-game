<script setup lang="ts">
import { GameState } from '@/types/game.ts'

const props = defineProps<{
    restart: () => void;
}>();

import { useGameStore } from '@/stores/game'
import { Icon } from "@iconify/vue";

const store = useGameStore();
</script>

<template>
<div v-if="store.gameState === GameState.FINISHED" class="results">
    <div>
        <p class="title">wpm</p>
        <p class="score">{{ store.wpm }}</p>
    </div>

    <div>
        <p class="title">acc</p>
        <p class="score">{{ store.accuracy }}%</p>
    </div>

    <Icon icon="subway:round-arrow-1" @click="props.restart" class="restartButton"/>
</div>
</template>

<style scoped>
.results .title {
    font-size: 1.4rem;
}

.results .score {
    font-size: 4rem;
}

.restartButton {
  font-size: 1.4rem;
}

.restartButton:hover {
  cursor: pointer;
}
</style>
