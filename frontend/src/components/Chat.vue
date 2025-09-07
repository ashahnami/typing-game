<script setup lang="ts">
import {nextTick, onMounted, ref, watch} from 'vue';
import { socket } from '@/socket';

const props = defineProps<{ lobbyId: string }>();

const messages = ref<string[][]>([]);
const messageInput = ref<string>('');
const messagesContainer = ref<HTMLDivElement | null>(null);

function sendMessage() {
  console.log('sending message:', messageInput.value);
  socket.emit('send-message', socket.id, messageInput.value, props.lobbyId);
  messageInput.value = '';
}

onMounted(() => {
  socket.on("receive-message", (data) => {
    console.log("received messaged: " + data);
    messages.value.push([data.username, data.message]);
  })
})

watch(() => messages.value.length, async () => {
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
      <div v-for="(msg, idx) in messages" :key="idx" class="chat-message">
        <div class="username">
          {{ msg[0]}}
          <span v-if="socket.id === msg[0]">(You)</span>
        </div>
        <div class="message">{{ msg[1] }}</div>
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
