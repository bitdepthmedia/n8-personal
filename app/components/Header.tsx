import styled from 'styled-components'
import { motion } from 'framer-motion'
import Image from 'next/image'

const HeaderWrapper = styled.header`
  padding: 4rem 2rem;
  position: relative;
  overflow: hidden;
  clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%);

  @media (max-width: 989px) {
    padding: 3rem 1.5rem;
    clip-path: polygon(0 0, 100% 0, 100% 93%, 0 100%);
  }

  @media (max-width: 575px) {
    padding: 2rem 1rem;
    clip-path: polygon(0 0, 100% 0, 100% 95%, 0 100%);
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
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-shadow: var(--text-shadow);

  @media (max-width: 575px) {
    font-size: 2.5rem;
  }
`

const Tagline = styled(motion.p)`
  font-size: 1.75rem;
  color: var(--accent-blue);
  text-shadow: var(--text-shadow);

  @media (max-width: 575px) {
    font-size: 1.25rem;
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

