<script setup lang="ts">
    const props = defineProps<{
        restart: () => void;
    }>();
import { useGameStore } from '@/stores/game'

enum GameState {
    WAITING,
    IN_PROGRESS,
    FINISHED
}

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

    <button @click="props.restart" class="restartButton">Restart</button>
</div>
</template>

<style scoped>
.results .title {
    font-size: 1.4rem;
}

.results .score {
    font-size: 4rem;
}
</style>