import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Play, Trophy, Wallet, Zap } from 'lucide-react'
import { useGame } from '../utils/GameContext'

const HomeContainer = styled.div`
  text-align: center;
  color: white;
  padding: 2rem;
`

const Title = styled(motion.h1)`
  font-size: 3rem;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #fff, #e0e7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  margin-bottom: 3rem;
  opacity: 0.9;
`

const FeaturesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
`

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #e0e7ff;
`

const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
`

const FeatureDescription = styled.p`
  opacity: 0.8;
  line-height: 1.6;
`

const StatsContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin: 2rem 0;
  flex-wrap: wrap;
`

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  min-width: 150px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #e0e7ff;
`

const StatLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
  margin-top: 0.5rem;
`

const StartButton = styled(motion(Link))`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
  }
`

function Home() {
  const { state } = useGame()

  return (
    <HomeContainer>
      <Title
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Welcome to Avalanche Game
      </Title>
      
      <Subtitle
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Experience the thrill of blockchain gaming on Avalanche
      </Subtitle>

      <StatsContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <StatCard>
          <StatValue>{state.highScore}</StatValue>
          <StatLabel>High Score</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{state.coins}</StatValue>
          <StatLabel>Coins Earned</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{state.level}</StatValue>
          <StatLabel>Current Level</StatLabel>
        </StatCard>
      </StatsContainer>

      <FeaturesGrid
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <FeatureCard
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <FeatureIcon>🎮</FeatureIcon>
          <FeatureTitle>Blockchain Gaming</FeatureTitle>
          <FeatureDescription>
            Play an exciting avalanche-themed game with real blockchain integration
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <FeatureIcon>🏆</FeatureIcon>
          <FeatureTitle>Leaderboards</FeatureTitle>
          <FeatureDescription>
            Compete with players worldwide and climb the global leaderboard
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <FeatureIcon>💰</FeatureIcon>
          <FeatureTitle>Earn Rewards</FeatureTitle>
          <FeatureDescription>
            Earn tokens and rewards for your achievements in the game
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <FeatureIcon>⚡</FeatureIcon>
          <FeatureTitle>Fast & Secure</FeatureTitle>
          <FeatureDescription>
            Built on Avalanche for lightning-fast transactions and security
          </FeatureDescription>
        </FeatureCard>
      </FeaturesGrid>

      <StartButton
        to="/game"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Play size={20} />
        Start Playing
      </StartButton>
    </HomeContainer>
  )
}

export default Home