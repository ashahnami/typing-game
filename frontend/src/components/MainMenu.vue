<script setup lang="ts">
import {onMounted, ref} from 'vue';
import router from '@/router';
import { socket } from '@/socket';
import { useLobbyStore } from '@/stores/lobby';

const lobbyId = ref('');
const lobbyStore = useLobbyStore();

function createLobby() {
  lobbyStore.createLobby();
}

function joinLobby() {
  lobbyStore.joinLobby(lobbyId.value);
}

</script>

<template>
  <div class="main-menu-layout">
    <div class="card">
      <h3>Practise by yourself.</h3>

      <RouterLink to="/practice">
        <button class="navButton">Practice Yourself</button>
      </RouterLink>
    </div>

    <div class="card">
      <h3>Create a race and invite your friends.</h3>

      <button class="navButton" @click="createLobby">Create a Race</button>
    </div>

    <div class="card">
      <h3>Join a race by entering the lobby ID below:</h3>

      <input class="lobby-id-input" v-model="lobbyId" placeholder="Enter the lobby ID" />

      <button class="navButton" @click="joinLobby">Join Race</button>
    </div>


  </div>
</template>

<style scoped>
.main-menu-layout {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.main-menu-layout .card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  gap: 10px;
}

.navButton {
  font-size: 1.2rem;
  padding: 0.6rem;
  width: 400px;
}

.navButton:hover {
  cursor: pointer;
}

.lobby-id-input {
  font-size: 1.2rem;
  padding: 0.6rem;
  width: 400px;
}
</style>
