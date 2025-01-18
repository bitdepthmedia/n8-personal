import styled from 'styled-components'
import { motion } from 'framer-motion'

const Section = styled.section`
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(5px);
  clip-path: polygon(0 5%, 100% 0, 100% 95%, 0 100%);

  @media (max-width: 989px) {
    padding: 3rem 1.5rem;
    clip-path: polygon(0 3%, 100% 0, 100% 97%, 0 100%);
  }

  @media (max-width: 575px) {
    padding: 2rem 1rem;
    clip-path: polygon(0 1%, 100% 0, 100% 99%, 0 100%);
  }
`

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

const Paragraph = styled(motion.p)`
  margin-bottom: 1.5rem;
  line-height: 1.8;
  font-size: 1.1rem;
  opacity: 0.9;
`

const Highlight = styled.span`
  color: var(--accent-blue);
  font-weight: 600;
`

export default function AboutMe() {
  return (
    <Section>
      <Content>
        <Paragraph
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Behind every business, there's me—the person who makes sure your <Highlight>team, systems, and strategy</Highlight> work together to keep your vision on track. For over two decades, I've been helping businesses and organizations turn ideas into sustainable realities. Whether it's building smarter systems, streamlining operations, or integrating the latest tech, my work is always about representing your interests and aligning your team—lawyers, accountants, engineers, and more—around what matters most: <Highlight>your goals</Highlight>.
        </Paragraph>
        <Paragraph
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          These days, I'm focused on helping organizations build <Highlight>sustainable, agentic AI systems</Highlight> that reduce friction and deliver results. When I'm not designing systems, I lead the Detroit Blockchain Center, a non-profit dedicated to teaching financial and digital literacy to empower communities.
        </Paragraph>
        <Paragraph
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          If you're ready to align your team, build smarter systems, and turn ideas into a business—<Highlight>let's talk</Highlight>.
        </Paragraph>
      </Content>
    </Section>
  )
}

