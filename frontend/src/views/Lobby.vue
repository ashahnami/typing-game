<script setup lang="ts">
import {ref} from 'vue'
import { useRoute } from 'vue-router'
import Chat from '@/components/Chat.vue'
import Game from "@/components/Game.vue";
import RacersList from "@/components/RacersList.vue";

const route = useRoute();
const lobbyId = ref(route.query.lobbyId);
const racers = ref<string[]>([]);

</script>

<template>
  Share this lobby ID with people you want to invite to the race: {{ lobbyId }}

  <div class="lobby-layout">
    <div class="lobby-col-main">
      <div class="card">
<!--        <Game />-->
      </div>

      <div class="card">
        <Chat :lobby-id="lobbyId" />
      </div>
    </div>

    <div class="lobby-col-side">
      <div class="card">
        <RacersList :lobby-id="lobbyId" />
      </div>
    </div>
  </div>

</template>

<style scoped>
.lobby-layout {
  display: flex;
  flex-direction: row;
  gap: 16px;
}

.lobby-col-main {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 3;
}

.lobby-col-side {
  flex: 1;
}

.lobby-layout .card {
  padding: 16px;
  background-color: #fff;
  border-radius: 4px;
}
</style>
