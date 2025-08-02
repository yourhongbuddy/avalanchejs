import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Wallet, Trophy, Home, Gamepad2 } from 'lucide-react'
import { useGame } from '../utils/GameContext'

const HeaderContainer = styled.header`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem 2rem;
`

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`

const NavLink = styled(Link)<{ $active?: boolean }>`
  color: ${props => props.$active ? '#fff' : 'rgba(255, 255, 255, 0.8)'};
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }
`

const WalletStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-size: 0.9rem;
`

const ConnectionIndicator = styled.div<{ $connected: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.$connected ? '#4ade80' : '#f87171'};
`

function Header() {
  const location = useLocation()
  const { state } = useGame()

  return (
    <HeaderContainer>
      <Nav>
        <Logo>
          <Gamepad2 size={24} />
          Avalanche Game
        </Logo>
        
        <NavLinks>
          <NavLink to="/" $active={location.pathname === '/'}>
            <Home size={16} />
            Home
          </NavLink>
          <NavLink to="/game" $active={location.pathname === '/game'}>
            <Gamepad2 size={16} />
            Play
          </NavLink>
          <NavLink to="/leaderboard" $active={location.pathname === '/leaderboard'}>
            <Trophy size={16} />
            Leaderboard
          </NavLink>
          <NavLink to="/wallet" $active={location.pathname === '/wallet'}>
            <Wallet size={16} />
            Wallet
          </NavLink>
          
          <WalletStatus>
            <ConnectionIndicator $connected={state.isConnected} />
            {state.wallet ? 
              `${state.wallet.slice(0, 6)}...${state.wallet.slice(-4)}` : 
              'Not Connected'
            }
          </WalletStatus>
        </NavLinks>
      </Nav>
    </HeaderContainer>
  )
}

export default Header