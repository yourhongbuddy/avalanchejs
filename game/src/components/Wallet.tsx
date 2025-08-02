import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Wallet, Copy, ExternalLink, Download, Upload, Key, Shield, Coins } from 'lucide-react'
import { useGame } from '../utils/GameContext'

const WalletContainer = styled.div`
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

const WalletCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 2rem;
`

const WalletHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`

const WalletIcon = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`

const WalletInfo = styled.div`
  flex: 1;
`

const WalletName = styled.h3`
  margin: 0;
  color: #e0e7ff;
`

const WalletStatus = styled.div<{ $connected: boolean }>`
  color: ${props => props.$connected ? '#4ade80' : '#f87171'};
  font-size: 0.9rem;
`

const AddressContainer = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`

const Address = styled.div`
  font-family: monospace;
  font-size: 0.9rem;
  color: #e0e7ff;
  flex: 1;
`

const CopyButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`

const BalanceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`

const BalanceCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
`

const BalanceValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #e0e7ff;
  margin-bottom: 0.5rem;
`

const BalanceLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
`

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`

const ActionButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const ConnectButton = styled(motion.button)`
  background: linear-gradient(45deg, #667eea, #764ba2);
  border: none;
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 2rem auto;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
  }
`

const TransactionHistory = styled.div`
  margin-top: 2rem;
`

const TransactionTitle = styled.h3`
  color: #e0e7ff;
  margin-bottom: 1rem;
`

const TransactionItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TransactionInfo = styled.div`
  flex: 1;
`

const TransactionType = styled.div`
  font-weight: 500;
  color: #e0e7ff;
`

const TransactionDate = styled.div`
  font-size: 0.8rem;
  opacity: 0.7;
`

const TransactionAmount = styled.div<{ $type: 'in' | 'out' }>`
  font-weight: bold;
  color: ${props => props.$type === 'in' ? '#4ade80' : '#f87171'};
`

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  opacity: 0.7;
`

interface Transaction {
  id: string
  type: 'in' | 'out'
  amount: number
  description: string
  date: string
}

const mockTransactions: Transaction[] = [
  { id: '1', type: 'in', amount: 100, description: 'Game Reward', date: '2024-01-15 14:30' },
  { id: '2', type: 'out', amount: 50, description: 'NFT Purchase', date: '2024-01-14 16:20' },
  { id: '3', type: 'in', amount: 200, description: 'Leaderboard Prize', date: '2024-01-13 10:15' },
  { id: '4', type: 'out', amount: 25, description: 'Game Boost', date: '2024-01-12 09:45' },
]

function Wallet() {
  const { state, dispatch } = useGame()
  const [copied, setCopied] = useState(false)
  const [transactions] = useState<Transaction[]>(mockTransactions)

  const connectWallet = async () => {
    // Simulate wallet connection
    const mockAddress = '0x' + Math.random().toString(16).substr(2, 40)
    dispatch({ type: 'SET_WALLET', payload: mockAddress })
  }

  const copyAddress = async () => {
    if (state.wallet) {
      await navigator.clipboard.writeText(state.wallet)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const disconnectWallet = () => {
    dispatch({ type: 'SET_WALLET', payload: null })
  }

  return (
    <WalletContainer>
      <Title>Wallet</Title>

      {state.wallet ? (
        <>
          <WalletCard>
            <WalletHeader>
              <WalletIcon>
                <Wallet size={24} />
              </WalletIcon>
              <WalletInfo>
                <WalletName>Avalanche Wallet</WalletName>
                <WalletStatus $connected={state.isConnected}>
                  {state.isConnected ? 'Connected' : 'Disconnected'}
                </WalletStatus>
              </WalletInfo>
            </WalletHeader>

            <AddressContainer>
              <Address>{state.wallet}</Address>
              <CopyButton
                onClick={copyAddress}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Copy address"
              >
                <Copy size={16} />
              </CopyButton>
            </AddressContainer>

            <BalanceGrid>
              <BalanceCard>
                <BalanceValue>{state.coins}</BalanceValue>
                <BalanceLabel>Game Coins</BalanceLabel>
              </BalanceCard>
              <BalanceCard>
                <BalanceValue>0.0</BalanceValue>
                <BalanceLabel>AVAX Balance</BalanceLabel>
              </BalanceCard>
              <BalanceCard>
                <BalanceValue>0</BalanceValue>
                <BalanceLabel>NFTs Owned</BalanceLabel>
              </BalanceCard>
              <BalanceCard>
                <BalanceValue>{state.highScore}</BalanceValue>
                <BalanceLabel>High Score</BalanceLabel>
              </BalanceCard>
            </BalanceGrid>

            <ActionButtons>
              <ActionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled
              >
                <Download size={16} />
                Import Wallet
              </ActionButton>
              <ActionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled
              >
                <Upload size={16} />
                Export Wallet
              </ActionButton>
              <ActionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled
              >
                <Key size={16} />
                View Private Key
              </ActionButton>
              <ActionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled
              >
                <Shield size={16} />
                Security Settings
              </ActionButton>
            </ActionButtons>
          </WalletCard>

          <TransactionHistory>
            <TransactionTitle>Recent Transactions</TransactionTitle>
            {transactions.map(transaction => (
              <TransactionItem key={transaction.id}>
                <TransactionInfo>
                  <TransactionType>{transaction.description}</TransactionType>
                  <TransactionDate>{transaction.date}</TransactionDate>
                </TransactionInfo>
                <TransactionAmount $type={transaction.type}>
                  {transaction.type === 'in' ? '+' : '-'}{transaction.amount}
                </TransactionAmount>
              </TransactionItem>
            ))}
          </TransactionHistory>
        </>
      ) : (
        <WalletCard>
          <EmptyState>
            <Wallet size={64} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <h3>No Wallet Connected</h3>
            <p>Connect your wallet to start earning rewards and playing with blockchain features.</p>
            <ConnectButton
              onClick={connectWallet}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Wallet size={20} />
              Connect Wallet
            </ConnectButton>
          </EmptyState>
        </WalletCard>
      )}

      {state.wallet && (
        <ActionButton
          onClick={disconnectWallet}
          style={{ marginTop: '1rem' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Disconnect Wallet
        </ActionButton>
      )}
    </WalletContainer>
  )
}

export default Wallet