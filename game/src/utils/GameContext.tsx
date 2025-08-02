import React, { createContext, useContext, useReducer, useEffect } from 'react'

export interface GameState {
  score: number
  level: number
  isPlaying: boolean
  wallet: string | null
  avalanche: any | null
  highScore: number
  coins: number
  isConnected: boolean
}

export interface GameAction {
  type: string
  payload?: any
}

const initialState: GameState = {
  score: 0,
  level: 1,
  isPlaying: false,
  wallet: null,
  avalanche: null,
  highScore: 0,
  coins: 0,
  isConnected: false,
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return { ...state, isPlaying: true, score: 0 }
    case 'END_GAME':
      return { 
        ...state, 
        isPlaying: false,
        highScore: Math.max(state.highScore, state.score)
      }
    case 'UPDATE_SCORE':
      return { ...state, score: action.payload }
    case 'UPDATE_LEVEL':
      return { ...state, level: action.payload }
    case 'SET_WALLET':
      return { ...state, wallet: action.payload }
    case 'SET_AVALANCHE':
      return { ...state, avalanche: action.payload }
    case 'SET_CONNECTED':
      return { ...state, isConnected: action.payload }
    case 'UPDATE_COINS':
      return { ...state, coins: action.payload }
    case 'RESET_GAME':
      return { ...initialState, highScore: state.highScore }
    default:
      return state
  }
}

interface GameContextType {
  state: GameState
  dispatch: React.Dispatch<GameAction>
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  useEffect(() => {
    // Initialize Avalanche connection (simulated for now)
    const initAvalanche = async () => {
      try {
        // Simulate Avalanche connection
        console.log('Initializing Avalanche connection...')
        dispatch({ type: 'SET_CONNECTED', payload: true })
      } catch (error) {
        console.error('Failed to initialize Avalanche:', error)
      }
    }

    initAvalanche()
  }, [])

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}