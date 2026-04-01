import { defineStore } from "pinia";

enum GameState {
    WAITING,
    IN_PROGRESS,
    FINISHED
}

export const useGameStore = defineStore('game', {
    state: () => ({
        position: 0,
        gameState: GameState.WAITING,
        speedTest: 120,
        wpm: 0,
        accuracy: 0,
        totalTime: 10,
        timeRemaining: 10,
        correctCharacters: 0,
        incorrectCharacters: 0
    })
})