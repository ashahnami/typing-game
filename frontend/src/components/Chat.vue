<script setup lang="ts">
import {nextTick, ref, watch} from 'vue';
import { socket } from '@/socket';
import { useLobbyStore } from '@/stores/lobby.ts'

const messageInput = ref<string>('');
const messagesContainer = ref<HTMLDivElement | null>(null);
const lobbyStore = useLobbyStore();

function sendMessage() {
  lobbyStore.sendMessage(messageInput.value)
}

watch(() => lobbyStore.messages.length, async () => {
  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
})
</script>

<template>
  <div class="chat-layout">
    <h3>Chat</h3>

    <div class="chat-messages" ref="messagesContainer">
      <div v-for="(msg, idx) in lobbyStore.messages" :key="idx" class="chat-message">
        <div class="username">
          {{ msg.username}}
          <span v-if="socket.id === msg.username">(You)</span>
        </div>
        <div class="message">{{ msg.message }}</div>
      </div>
    </div>

    <input v-model="messageInput" placeholder="Enter a message" class="chat-message-input" @keyup.enter="sendMessage" />
  </div>
</template>

<style scoped>
.chat-layout {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
}

.chat-messages {
  min-height: 140px;
  max-height: 140px;
  overflow-y: scroll;
}

.chat-message {
  display: flex;
  flex-direction: row;
  gap: 8px;
}

.chat-message .username {
  font-weight: bold;
}

.chat-message-input {
  width: 100%;
  padding: 6px 2px;
}

.chat-message-input:focus {
  outline: none;
}
</style>
