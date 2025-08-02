import React from 'react'
import { Routes, Route } from 'react-router-dom'
import styled from 'styled-components'
import Header from './components/Header'
import Home from './components/Home'
import Game from './components/Game'
import Leaderboard from './components/Leaderboard'
import Wallet from './components/Wallet'
import { GameProvider } from './utils/GameContext'

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`

function App() {
  return (
    <GameProvider>
      <AppContainer>
        <Header />
        <MainContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/wallet" element={<Wallet />} />
          </Routes>
        </MainContent>
      </AppContainer>
    </GameProvider>
  )
}

export default App