<script setup lang="ts">
enum GameState {
    WAITING,
    IN_PROGRESS,
    FINISHED
}

import { ref, onMounted, type InputHTMLAttributes, useTemplateRef } from 'vue';
import axios from 'axios';

const gameState = ref<GameState>(GameState.WAITING);
const words = ref<string[]>([]);
const typedLetter = ref('');
const wordIndex = ref(0);
const letterIndex = ref<number>(0);

const time = ref(30);
const wpm = ref(0);
const acc = ref(0);
const correctLetters = ref(0);

const wordsElement = useTemplateRef<HTMLDivElement>('wordsElement');
const letterElement = ref<HTMLSpanElement>();
const inputElement = useTemplateRef<HTMLInputElement>('inputElement');
const caretElement = useTemplateRef<HTMLDivElement>('caretElement');

function updateGame(event: InputHTMLAttributes) {
    if (letterIndex.value < words.value[wordIndex.value].length) {
        letterElement.value = wordsElement.value?.children[wordIndex.value].children[letterIndex.value] as HTMLSpanElement;

        if (typedLetter.value === words.value[wordIndex.value][letterIndex.value]) {
            letterElement.value.className += 'correct'
            correctLetters.value++;
        } else {
            letterElement.value.className += 'incorrect'
        }

        moveCaret();
    }

    letterIndex.value++;
    typedLetter.value = '';
}

function keyPress(event: KeyboardEvent) {
    if (event.code == 'Space') {
        event.preventDefault();
        nextWord();
    }

    if (gameState.value === GameState.WAITING) {
        startGame();
    }
}

function nextWord() {
    if (letterIndex.value !== 0 || words.value[wordIndex.value].length === 1) {
        wordIndex.value++;
        letterIndex.value = 0;
        nextWord();
        moveCaret();
    }
}

function moveCaret() {
    const offset = 4;
    caretElement.value.style.top = `${letterElement.value.offsetTop + offset}px`;
    caretElement.value.style.left = `${letterElement.value.offsetLeft + letterElement.value.offsetWidth}px`
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

function resetGame() {
    gameState.value = GameState.WAITING;
    time.value = 30
    typedLetter.value = ''
    wordIndex.value = 0
    letterIndex.value = 0
    wpm.value = 0
}

onMounted(async () => {
    try {
        const response = await axios.get('/api/quote');
        words.value = response.data.split(' ');
    } catch (error) {
        console.log('Error fetching quote');
    }

    focusInput();
    moveCaret();
})
</script>

<template>
    <div v-if="gameState !== GameState.FINISHED" class="game">
        <input
            ref="inputElement"
            v-model="typedLetter"
            @input="updateGame"
            @keydown="keyPress"
            class="input"
            type="text"
        />

        <div class="time">{{ time }}</div>

        <div ref="wordsElement" class="words" tabindex=0 @focus="focusInput">
            <span v-for="(word, index) in words" :key="index">
                <span v-for="(letter, index) in word" :key="index">
                    {{ letter }}
                </span>
            </span>

            <div ref="caretElement" class="caret"></div>
        </div>

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
    position: absolute;
    top: -48px;
    font-size: 1.5rem;
}

.words {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 0.4em;
    font-size: 1.2rem;
    letter-spacing: 0.05rem;
}

.input {
    position: absolute;
    opacity: 0;
}

.correct {
    color: green;
}

.incorrect {
    color: red;
}

.caret {
    position: absolute;
    height: 1.2em;
    top: 0;
    border-right: 2px solid cyan;
    animation: caret 1s infinite;
    transition: all 0.2s ease;
}

@keyframes caret {
    0%,
    to {
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
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