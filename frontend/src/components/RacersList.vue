<script setup lang="ts">
import {onMounted, ref} from 'vue';
import { socket } from '@/socket';

const props = defineProps<{ lobbyId: string }>();

const racers = ref<string[]>([]);

function fetchRacers() {
  socket.emit('get-racers', props.lobbyId, (racersList: string[]) => {
    racers.value = racersList;
  })
  return true;
}

onMounted(fetchRacers)
</script>

<template>
  <div class="racersList-layout">
    <h3>Racers</h3>

    <div class="racers-list">
      <div v-for="(racer, idx) in racers" :key="idx" class="racer">
        {{ racer }}
        <span v-if="socket.id === racer">(You)</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.racersList-layout {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
