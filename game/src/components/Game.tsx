import React, { useState, useEffect, useCallback, useRef } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from '../utils/GameContext'
import { Pause, Play, RotateCcw, Trophy } from 'lucide-react'

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  height: 100%;
`

const GameHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin-bottom: 2rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`

const GameStats = styled.div`
  display: flex;
  gap: 2rem;
  font-size: 1.1rem;
`

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #e0e7ff;
`

const StatLabel = styled.div`
  font-size: 0.8rem;
  opacity: 0.8;
`

const GameControls = styled.div`
  display: flex;
  gap: 1rem;
`

const ControlButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const GameCanvas = styled.div`
  position: relative;
  width: 800px;
  height: 600px;
  background: linear-gradient(180deg, #1e293b 0%, #334155 100%);
  border-radius: 16px;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`

const Player = styled(motion.div)`
  position: absolute;
  width: 40px;
  height: 40px;
  background: linear-gradient(45deg, #e0e7ff, #c7d2fe);
  border-radius: 50%;
  border: 3px solid #818cf8;
  box-shadow: 0 0 20px rgba(129, 140, 248, 0.5);
  z-index: 10;
`

const Snowflake = styled(motion.div)`
  position: absolute;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  z-index: 5;
`

const Coin = styled(motion.div)`
  position: absolute;
  width: 30px;
  height: 30px;
  background: linear-gradient(45deg, #fbbf24, #f59e0b);
  border-radius: 50%;
  border: 2px solid #d97706;
  box-shadow: 0 0 15px rgba(251, 191, 36, 0.6);
  z-index: 8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: #92400e;
`

const GameOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 20;
`

const GameOverText = styled.h2`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #e0e7ff;
`

const GameOverStats = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`

const RestartButton = styled(motion.button)`
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

interface GameObject {
  id: string
  x: number
  y: number
  speed: number
}

interface Coin extends GameObject {
  collected: boolean
}

interface Snowflake extends GameObject {
  size: number
}

function Game() {
  const { state, dispatch } = useGame()
  const [playerPos, setPlayerPos] = useState({ x: 400, y: 550 })
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([])
  const [coins, setCoins] = useState<Coin[]>([])
  const [gameOver, setGameOver] = useState(false)
  const [paused, setPaused] = useState(false)
  const gameLoopRef = useRef<number>()
  const lastTimeRef = useRef<number>(0)

  const generateSnowflake = useCallback(() => {
    const snowflake: Snowflake = {
      id: Math.random().toString(36).substr(2, 9),
      x: Math.random() * 760,
      y: -20,
      speed: 1 + Math.random() * 2,
      size: 10 + Math.random() * 15
    }
    setSnowflakes(prev => [...prev, snowflake])
  }, [])

  const generateCoin = useCallback(() => {
    const coin: Coin = {
      id: Math.random().toString(36).substr(2, 9),
      x: Math.random() * 760,
      y: -30,
      speed: 1 + Math.random() * 1.5,
      collected: false
    }
    setCoins(prev => [...prev, coin])
  }, [])

  const checkCollision = useCallback((obj1: { x: number; y: number; width?: number; height?: number }, 
                                   obj2: { x: number; y: number; width?: number; height?: number }) => {
    const width1 = obj1.width || 40
    const height1 = obj1.height || 40
    const width2 = obj2.width || 20
    const height2 = obj2.height || 20

    return obj1.x < obj2.x + width2 &&
           obj1.x + width1 > obj2.x &&
           obj1.y < obj2.y + height2 &&
           obj1.y + height1 > obj2.y
  }, [])

  const gameLoop = useCallback((timestamp: number) => {
    if (paused || gameOver) return

    const deltaTime = timestamp - lastTimeRef.current
    lastTimeRef.current = timestamp

    // Update snowflakes
    setSnowflakes(prev => {
      const updated = prev.map(snowflake => ({
        ...snowflake,
        y: snowflake.y + snowflake.speed
      })).filter(snowflake => snowflake.y < 600)

      // Check collisions with snowflakes
      updated.forEach(snowflake => {
        if (checkCollision(playerPos, snowflake)) {
          setGameOver(true)
          dispatch({ type: 'END_GAME' })
        }
      })

      return updated
    })

    // Update coins
    setCoins(prev => {
      const updated = prev.map(coin => ({
        ...coin,
        y: coin.y + coin.speed
      })).filter(coin => coin.y < 600 && !coin.collected)

      // Check collisions with coins
      updated.forEach(coin => {
        if (!coin.collected && checkCollision(playerPos, coin)) {
          coin.collected = true
          dispatch({ type: 'UPDATE_SCORE', payload: state.score + 10 })
          dispatch({ type: 'UPDATE_COINS', payload: state.coins + 1 })
        }
      })

      return updated
    })

    // Generate new objects
    if (Math.random() < 0.02) generateSnowflake()
    if (Math.random() < 0.005) generateCoin()

    gameLoopRef.current = requestAnimationFrame(gameLoop)
  }, [paused, gameOver, playerPos, checkCollision, generateSnowflake, generateCoin, state.score, state.coins, dispatch])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver || paused) return

      setPlayerPos(prev => {
        let newX = prev.x
        let newY = prev.y

        switch (e.key) {
          case 'ArrowLeft':
            newX = Math.max(20, prev.x - 20)
            break
          case 'ArrowRight':
            newX = Math.min(760, prev.x + 20)
            break
          case 'ArrowUp':
            newY = Math.max(20, prev.y - 20)
            break
          case 'ArrowDown':
            newY = Math.min(560, prev.y + 20)
            break
        }

        return { x: newX, y: newY }
      })
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [gameOver, paused])

  useEffect(() => {
    if (!paused && !gameOver) {
      gameLoopRef.current = requestAnimationFrame(gameLoop)
    }
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
      }
    }
  }, [gameLoop, paused, gameOver])

  const startGame = () => {
    setGameOver(false)
    setPaused(false)
    setSnowflakes([])
    setCoins([])
    setPlayerPos({ x: 400, y: 550 })
    dispatch({ type: 'START_GAME' })
  }

  const togglePause = () => {
    setPaused(!paused)
  }

  const handleGameOver = () => {
    setGameOver(true)
    dispatch({ type: 'END_GAME' })
  }

  return (
    <GameContainer>
      <GameHeader>
        <GameStats>
          <StatItem>
            <StatValue>{state.score}</StatValue>
            <StatLabel>Score</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{state.level}</StatValue>
            <StatLabel>Level</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{state.coins}</StatValue>
            <StatLabel>Coins</StatLabel>
          </StatItem>
        </GameStats>

        <GameControls>
          <ControlButton
            onClick={togglePause}
            disabled={gameOver}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {paused ? <Play size={16} /> : <Pause size={16} />}
            {paused ? 'Resume' : 'Pause'}
          </ControlButton>
          <ControlButton
            onClick={startGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw size={16} />
            Restart
          </ControlButton>
        </GameControls>
      </GameHeader>

      <GameCanvas>
        <Player
          animate={{ x: playerPos.x, y: playerPos.y }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />

        <AnimatePresence>
          {snowflakes.map(snowflake => (
            <Snowflake
              key={snowflake.id}
              initial={{ x: snowflake.x, y: snowflake.y, scale: 0 }}
              animate={{ 
                x: snowflake.x, 
                y: snowflake.y, 
                scale: 1,
                rotate: 360
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                width: snowflake.size,
                height: snowflake.size
              }}
            />
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {coins.map(coin => !coin.collected && (
            <Coin
              key={coin.id}
              initial={{ x: coin.x, y: coin.y, scale: 0 }}
              animate={{ 
                x: coin.x, 
                y: coin.y, 
                scale: 1,
                rotate: [0, 360]
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ 
                duration: 0.3,
                rotate: { duration: 2, repeat: Infinity, ease: "linear" }
              }}
            >
              $
            </Coin>
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {gameOver && (
            <GameOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <GameOverText>Game Over!</GameOverText>
              <GameOverStats>
                <p>Final Score: {state.score}</p>
                <p>Coins Collected: {state.coins}</p>
                <p>High Score: {state.highScore}</p>
              </GameOverStats>
              <RestartButton
                onClick={startGame}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Trophy size={20} />
                Play Again
              </RestartButton>
            </GameOverlay>
          )}
        </AnimatePresence>
      </GameCanvas>
    </GameContainer>
  )
}

export default Game