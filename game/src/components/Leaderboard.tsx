import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Trophy, Medal, Crown, Star } from 'lucide-react'
import { useGame } from '../utils/GameContext'

const LeaderboardContainer = styled.div`
  color: white;
  max-width: 800px;
  margin: 0 auto;
`

const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  background: linear-gradient(45deg, #fff, #e0e7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const LeaderboardCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 2rem;
`

const LeaderboardHeader = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr 100px 100px;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  margin-bottom: 1rem;
  font-weight: bold;
  color: #e0e7ff;
`

const LeaderboardRow = styled(motion.div)`
  display: grid;
  grid-template-columns: 50px 1fr 100px 100px;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  margin-bottom: 0.5rem;
  align-items: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(5px);
  }
`

const Rank = styled.div<{ $rank: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-weight: bold;
  background: ${props => {
    switch (props.$rank) {
      case 1: return 'linear-gradient(45deg, #fbbf24, #f59e0b)'
      case 2: return 'linear-gradient(45deg, #9ca3af, #6b7280)'
      case 3: return 'linear-gradient(45deg, #cd7f32, #b8860b)'
      default: return 'rgba(255, 255, 255, 0.2)'
    }
  }};
  color: ${props => props.$rank <= 3 ? 'white' : '#e0e7ff'};
`

const PlayerName = styled.div`
  font-weight: 500;
`

const Score = styled.div`
  text-align: center;
  font-weight: bold;
  color: #e0e7ff;
`

const Level = styled.div`
  text-align: center;
  color: #818cf8;
`

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  opacity: 0.7;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
`

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #e0e7ff;
  margin-bottom: 0.5rem;
`

const StatLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
`

interface LeaderboardEntry {
  id: string
  name: string
  score: number
  level: number
  date: string
}

const mockLeaderboardData: LeaderboardEntry[] = [
  { id: '1', name: 'AvalancheMaster', score: 2500, level: 15, date: '2024-01-15' },
  { id: '2', name: 'SnowRunner', score: 2100, level: 12, date: '2024-01-14' },
  { id: '3', name: 'BlockchainGamer', score: 1800, level: 10, date: '2024-01-13' },
  { id: '4', name: 'CryptoPlayer', score: 1650, level: 9, date: '2024-01-12' },
  { id: '5', name: 'AvalancheFan', score: 1400, level: 8, date: '2024-01-11' },
  { id: '6', name: 'GameDev', score: 1200, level: 7, date: '2024-01-10' },
  { id: '7', name: 'Web3Gamer', score: 1100, level: 6, date: '2024-01-09' },
  { id: '8', name: 'BlockchainHero', score: 950, level: 5, date: '2024-01-08' },
  { id: '9', name: 'AvalanchePro', score: 800, level: 4, date: '2024-01-07' },
  { id: '10', name: 'CryptoKing', score: 650, level: 3, date: '2024-01-06' },
]

function Leaderboard() {
  const { state } = useGame()
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(mockLeaderboardData)

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown size={16} />
      case 2: return <Medal size={16} />
      case 3: return <Trophy size={16} />
      default: return <Star size={16} />
    }
  }

  const getCurrentPlayerRank = () => {
    const sortedData = [...leaderboardData].sort((a, b) => b.score - a.score)
    const playerRank = sortedData.findIndex(entry => entry.name === 'You') + 1
    return playerRank > 0 ? playerRank : null
  }

  return (
    <LeaderboardContainer>
      <Title>Leaderboard</Title>

      <StatsGrid>
        <StatCard>
          <StatValue>{state.highScore}</StatValue>
          <StatLabel>Your High Score</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{getCurrentPlayerRank() || 'N/A'}</StatValue>
          <StatLabel>Your Rank</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{state.coins}</StatValue>
          <StatLabel>Total Coins</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{state.level}</StatValue>
          <StatLabel>Current Level</StatLabel>
        </StatCard>
      </StatsGrid>

      <LeaderboardCard>
        <LeaderboardHeader>
          <div>Rank</div>
          <div>Player</div>
          <div>Score</div>
          <div>Level</div>
        </LeaderboardHeader>

        {leaderboardData.length > 0 ? (
          leaderboardData
            .sort((a, b) => b.score - a.score)
            .map((entry, index) => (
              <LeaderboardRow
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Rank $rank={index + 1}>
                  {index < 3 ? getRankIcon(index + 1) : index + 1}
                </Rank>
                <PlayerName>{entry.name}</PlayerName>
                <Score>{entry.score.toLocaleString()}</Score>
                <Level>{entry.level}</Level>
              </LeaderboardRow>
            ))
        ) : (
          <EmptyState>
            <Trophy size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <p>No leaderboard data available yet.</p>
            <p>Play the game to see your ranking!</p>
          </EmptyState>
        )}
      </LeaderboardCard>
    </LeaderboardContainer>
  )
}

export default Leaderboard