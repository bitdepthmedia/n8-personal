import styled from 'styled-components'
import { motion } from 'framer-motion'

const MenuWrapper = styled.section`
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 989px) {
    padding: 3rem 1.5rem;
  }

  @media (max-width: 575px) {
    padding: 2rem 1rem;
  }
`

const Nav = styled.nav`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const NavCard = styled(motion.a)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 1.5rem;
  text-decoration: none;
  color: var(--primary-text);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-5px);
  }
`

const CardTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--accent-gold);
`

const CardDescription = styled.p`
  font-size: 0.9rem;
  opacity: 0.8;
`

export default function Menu() {
  return (
    <MenuWrapper>
      <Nav>
        <NavCard
          href="https://inrconsulting.biz"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <CardTitle>Business Consulting</CardTitle>
          <CardDescription>Strategic insights for your business growth</CardDescription>
        </NavCard>
        <NavCard
          href="https://bitdepthmedia.com"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <CardTitle>AI Integrations</CardTitle>
          <CardDescription>Cutting-edge AI solutions for your company</CardDescription>
        </NavCard>
        <NavCard
          href="https://detroitblockchaincenter.org"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <CardTitle>Blockchain/Crypto</CardTitle>
          <CardDescription>Explore the future of decentralized technology</CardDescription>
        </NavCard>
        <NavCard
          href="/NateTalbotMediaKit.zip"
          download
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <CardTitle>Media Kit</CardTitle>
          <CardDescription>Download resources and information</CardDescription>
        </NavCard>
      </Nav>
    </MenuWrapper>
  )
}

