<script setup lang="ts">
import {ref} from 'vue'
import { useRoute } from 'vue-router'
import Chat from '@/components/Chat.vue'
import Game from "@/components/Game.vue";
import RacersList from "@/components/RacersList.vue"
import { socket } from '@/socket';
import { useLobbyStore } from '@/stores/lobby';

const route = useRoute();
const lobbyId = ref(route.query.lobbyId);
const racers = ref<string[]>([]);
const showModal = ref<boolean>(false);
const lobbyStore = useLobbyStore();

const startRace = () => {
  lobbyStore.startGame();
}
</script>

<template>
  <div>
    {{ lobbyStore.gameStarted ? 'Game started' : 'Game not started'}}
    <div @click="showModal = true" class="invite-button">Invite people</div>

    <div class="modal-overlay" v-if="showModal">
      <div>
        Share this lobby ID with people you want to invite to the race:
        <input :value="lobbyStore.lobbyId" readonly />
      </div>

      <button @click="showModal = false">Close</button>
    </div>

    <div class="lobby-layout">
      <div class="lobby-col-main">
        <div class="card">
          <Game />
          <button @click="startRace">Start Race</button>
        </div>

        <div class="card">
          <Chat />
        </div>
      </div>

      <div class="lobby-col-side">
        <div class="card">
          <RacersList />
        </div>
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

.invite-button:hover {
  text-decoration: underline;
  cursor: pointer;
}

.modal-overlay {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
  padding: 20px;
  background-color: lightgrey;
  border-radius: 8px;
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  z-index: 98;
  margin-left: auto;
  margin-right: auto;
  width: 500px;
  height: 200px;
}
</style>
