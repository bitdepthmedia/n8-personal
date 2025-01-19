import styled from 'styled-components'
import { motion } from 'framer-motion'
import Image from 'next/image'

const HeaderWrapper = styled.header`
  padding: 2rem 2rem 4rem;
  position: relative;
  overflow: hidden;
  clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%);
  margin-top: 3rem;

  @media (max-width: 989px) {
    padding: 2rem 1.5rem 3rem;
    margin-top: 2rem;
  }

  @media (max-width: 575px) {
    padding: 1.5rem 1rem 2.5rem;
    margin-top: 1rem;
  }
`

const BackgroundImage = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.2;
  z-index: -1;
`

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`

const Title = styled(motion.h1)`
  font-size: 4.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-shadow: var(--text-shadow);
  font-style: italic;
  text-align: left;
  max-width: 800px;
  margin-left: 10%;

  @media (max-width: 575px) {
    font-size: 2.5rem;
    margin-left: 5%;
  }
`

const Tagline = styled(motion.p)`
  font-size: 1.75rem;
  color: var(--accent-blue);
  text-shadow: var(--text-shadow);
  font-style: italic;
  text-align: left;
  max-width: 800px;
  margin-left: 10%;

  @media (max-width: 575px) {
    font-size: 1.25rem;
    margin-left: 5%;
  }
`

export default function Header() {
  return (
    <HeaderWrapper>
      <BackgroundImage
        src="/placeholder.jpg"
        alt="Background"
        width={1920}
        height={1080}
        priority
      />
      <ContentWrapper>
        <Title
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Nate Talbot
        </Title>
        <Tagline
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          The Business Behind Your Business
        </Tagline>
      </ContentWrapper>
    </HeaderWrapper>
  )
}

