<script setup lang="ts">

import { GameState } from '@/types/game.ts'

enum LetterStatus {
  REMAINING,
  ERROR,
  CORRECT,
  SKIPPED
}

interface Part {
  character: string;
  state: LetterStatus;
}

import {ref, onMounted, useTemplateRef} from 'vue';
import axios from 'axios';
import { useGameStore } from '@/stores/game'
import Results from '@/components/Results.vue'
import Timer from '@/components/Timer.vue'
import { Icon } from "@iconify/vue";

const words = ref<string[]>([]);

const status = ref<Part[]>([]);
const store = useGameStore();

const inputElement = useTemplateRef<HTMLInputElement>('inputElement');

function keyPress(event: KeyboardEvent) {
    if (!isAlphaNumeric(event.key) && event.code != 'Space' && event.code != 'Backspace') {
        event.preventDefault();
        return;
    }

    if (store.gameState === GameState.WAITING) {
      startGame();
    }

    if (event.code == 'Backspace') {
        return;
    }

    handleLetter(event.key);
}

const handleLetter = (key: string) => {
    if (isValidInput(key)) {
      const current = getCurrent()
      if (getCurrent().character === key) {
        current.state = LetterStatus.CORRECT;
        store.correctCharacters++;
        store.position++;

      } else if (key === ' ') {
        let newPos = store.position;
        if (store.position > 0 && status.value[store.position - 1].character !== ' ') {
          while (newPos < status.value.length && status.value[newPos].character !== ' ') {
            status.value[newPos].state = LetterStatus.SKIPPED;
            store.incorrectCharacters++;
            newPos++;
          }
        }
        store.position = newPos;
        store.position++;

      } else {
        current.state = LetterStatus.ERROR;
        store.incorrectCharacters++;
        store.position++;
      }
    }
}

function isAlphaNumeric(key : string): boolean {
    return /^[a-z0-9]$/i.test(key);
}

function isValidInput(key : string): boolean {
    return /^[a-z0-9 ]$/i.test(key);
}

function focusInput() {
    inputElement.value?.focus();
}

function startGame() {
    store.gameState = GameState.IN_PROGRESS;
    setTimer();
}

function getCurrent() {
    return status.value[store.position];
}

function getResults() {
  store.wpm = Math.round((store.correctCharacters * 60) / (5 * store.totalTime));
  store.accuracy = Math.round((store.correctCharacters / (store.correctCharacters + store.incorrectCharacters)) * 100);
}

function setTimer() {
    function tick() {
        if (store.timeRemaining > 0) {
            store.timeRemaining--;
        }

        if (store.gameState === GameState.WAITING || store.timeRemaining === 0) {
            clearInterval(interval);
        }

        if (store.timeRemaining === 0) {
            store.gameState = GameState.FINISHED;
            getResults();
        }
    }

    const interval = setInterval(tick, 1000);
}

function buildLetterStatus() {
    status.value = Array.from(words.value.join(" ")).map(char => ({
      character: char,
      state: LetterStatus.REMAINING
    }))
}

function resetGame() {
    store.gameState = GameState.WAITING;
    buildLetterStatus();
    store.position = 0;
    store.wpm = 0;
    store.accuracy = 0;
    store.totalTime = 30;
    store.timeRemaining = 30;
    store.correctCharacters = 0;
    store.incorrectCharacters = 0;
}



onMounted(async () => {
    try {
        const response = await axios.get('/api/quote');
        words.value = response.data.split(' ');
        buildLetterStatus();
    } catch (error) {
        console.log('Error fetching quote', error);
    }

    focusInput();
})

</script>

<template>
    <div v-if="store.gameState !== GameState.FINISHED" class="game">
      <div class="words" tabindex=0 @focus="focusInput">
          <span
            v-for="({ character, state }, index) in status"
            :key="index"
            class="letter"
            :class="{
              error: state === LetterStatus.ERROR,
              correct: state === LetterStatus.CORRECT,
              skipped: state === LetterStatus.SKIPPED,
              current: index === store.position
            }"
          >
            {{ character === ' ' ? '&nbsp;' : character }}
          </span>
      </div>


      <input
        type="text"
        @keydown="keyPress"
        ref="inputElement"
        class="input"
        name="typingInput"
        autocomplete="off"
      />

      <Timer />

      <Icon icon="subway:round-arrow-1" @click="resetGame" class="restartButton" />
    </div>

    <Results :restart="resetGame" />
</template>

<style scoped>
.game {
    position: relative;
    margin-top: auto;
    margin-bottom: auto;
    justify-content: left;
}

.words {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    font-size: 1.2rem;
}

.letter {
  position: relative;
  display: inline-block;
  margin: 0 0.12em;
  line-height: 1em;
  white-space: pre;
  color: grey;

  &.current::before {
    content: '|';
    position: absolute;
    font-size: 1.5rem;
    left: -5px;
    animation: 1.2s blink infinite ease-in-out;
  }
}

@keyframes blink {
  0%,

  25% {
    opacity: 1;
  }

  75% {
    opacity: 0;
  }
}

.input {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    user-select: none;
}

.correct {
    color: black;
}

.error {
    color: red;
}

.restartButton {
    font-size: 1.2rem;
}

.restartButton:hover {
    cursor: pointer;
}
</style>
