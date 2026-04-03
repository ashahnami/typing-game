import { defineStore} from 'pinia'
import { socket } from '@/socket'
import router from '@/router'

export const useLobbyStore = defineStore('lobby', {
  state: () => ({
    lobbyId: '',
    players: [] as string[],
    isHost: false,
    gameStarted: false,
    username: '',
    messages: [] as { username: string, message: string }[]
  }),
  actions: {
    bindEvents() {
      socket.on('lobby-created', ({ lobbyId, host }: { lobbyId: string, host: string }) => {
        this.lobbyId = lobbyId
        this.isHost = true
        this.username = host
        this.players.push(host)
      })

      socket.on('lobby-joined', ({ lobbyId, player }: { lobbyId: string, player: string }) => {
        this.lobbyId = lobbyId
        this.username = player
        this.players.push(player)
      })

      socket.on('receive-message', ({ username, message }: { username: string, message: string }) => {
        this.messages.push({ username, message })
      })

      socket.on('game-started', () => {
        this.gameStarted = true
      })
    },
    createLobby() {
      socket.emit('create-lobby')
      router.push({ name: 'lobby' })
    },
    joinLobby(lobbyId: string) {
      socket.emit('join-lobby', { lobbyId })
      router.push({ name: 'lobby' })
    },
    sendMessage(message: string) {
      socket.emit('send-message', this.username, message, this.lobbyId)
    },
    startGame() {
      if (this.isHost) socket.emit('start-game', { lobbyId: this.lobbyId })
      else console.error('Only the host can start the game')
    },
  },
})
