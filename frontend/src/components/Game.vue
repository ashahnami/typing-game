<script setup lang="ts">

enum GameState {
    WAITING,
    IN_PROGRESS,
    FINISHED
}

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

const words = ref<string[]>([]);

// Game State
const position = ref<number>(0);
const status = ref<Part[]>([]);

const letterIndex = ref<number>(0);

const gameState = ref<GameState>(GameState.WAITING);
const typedLetter = ref('');
const typedWord = ref<string>('');

const time = ref(30);
const wpm = ref(0);
const acc = ref(0);
const correctLetters = ref(0);

const inputElement = useTemplateRef<HTMLInputElement>('inputElement');

function keyPress(event: KeyboardEvent) {
    if (!isAlphaNumeric(event.key) && event.code != 'Space' && event.code != 'Backspace') {
        event.preventDefault();
        return;
    }

    if (gameState.value === GameState.WAITING) {
      startGame();
    }

    if (event.code == 'Backspace') {
        return;
    }

    console.log("key pressed: ", event.key);
    handleLetter(event.key);
}

const handleLetter = (key: string) => {
    if (isValidInput(key)) {
      const current = getCurrent()
      if (getCurrent().character === key) {
        current.state = LetterStatus.CORRECT;
        position.value++;

      } else if (key === ' ') {
        let newPos = position.value;
        if (position.value > 0 && status.value[position.value - 1].character !== ' ') {
          while (newPos < status.value.length && status.value[newPos].character !== ' ') {
            status.value[newPos].state = LetterStatus.SKIPPED;
            newPos++;
          }
        }
        position.value = newPos
        position.value++;

      } else {
        current.state = LetterStatus.ERROR;
        position.value++;
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
    gameState.value = GameState.IN_PROGRESS;
    setTimer();
}

function getResults() {
    wpm.value = getWPM();
    acc.value = getAccuracy();
}

function getWPM() {
    const word = 5;
    const minutes = 0.5;
    return Math.floor(correctLetters.value / word / minutes);
}

function getAccuracy() {
    const totalLetters = getTotalLetters(words.value)
    return Math.floor((correctLetters.value / totalLetters) * 100)
  }

function getTotalLetters(words: string[]) {
  let sum = 0
  for (let i=0; i<words.length; i++) {
      sum += words[i].length
  }
  return sum
}

function getCurrent() {
    return status.value[position.value];
}

function setTimer() {
    function tick() {
        if (time.value > 0) {
            time.value--;
        }

        if (gameState.value === GameState.WAITING || time.value === 0) {
            clearInterval(interval);
        }

        if (time.value === 0) {
            gameState.value = GameState.FINISHED;
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
    gameState.value = GameState.WAITING;
    time.value = 30
    typedLetter.value = ''
    typedWord.value = ''
    letterIndex.value = 0
    buildLetterStatus();
    wpm.value = 0
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
    <div v-if="gameState !== GameState.FINISHED" class="game">
      <div ref="words" class="words" tabindex=0 @focus="focusInput">
          <span
            v-for="({ character, state }, index) in status"
            :key="index"
            class="letter"
            :class="{
              error: state === LetterStatus.ERROR,
              correct: state === LetterStatus.CORRECT,
              skipped: state === LetterStatus.SKIPPED,
              current: index === position
            }"
          >
            {{ character === ' ' ? '&nbsp;' : character }}
          </span>
        </div>


      <input
        type="text"
        @keydown="keyPress"
        v-model="typedWord"
        ref="inputElement"
        class="input"
      />

      <div class="time">{{ time }}</div>

      <button @click="resetGame" class="restartButton">Restart</button>
    </div>

    <div v-if="gameState === GameState.FINISHED" class="results">
        <div>
            <p class="title">wpm</p>
            <p class="score">{{ wpm }}</p>
        </div>

        <div>
            <p class="title">acc</p>
            <p class="score">{{ acc }}%</p>
        </div>

        <button @click="resetGame" class="restartButton">Restart</button>
    </div>
</template>

<style scoped>
.game {
    position: relative;
}

.time {
    font-size: 1.5rem;
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
    opacity: 0;
    font-size: 1.2rem;
    width: 100%;
    padding: 4px;
}

.correct {
    color: forestgreen;
}

.error {
    background-color: indianred;
}

.skipped {
    color: #ccc;
}

.results .title {
    font-size: 1.4rem;
}

.results .score {
    font-size: 4rem;
}

.restartButton {
    font-size: 1.2rem;
    padding: 0.6rem;
}

.restartButton:hover {
    cursor: pointer;
}
</style>
