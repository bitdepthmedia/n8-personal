'use client'

import { useEffect } from 'react'
import styled from 'styled-components'
import Header from './components/Header'
import AboutMe from './components/AboutMe'
import Menu from './components/Menu'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'

const Main = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

export default function Home() {
  useEffect(() => {
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => {
      document.documentElement.style.scrollBehavior = ''
    }
  }, [])

  return (
    <Main>
      <Header />
      <AboutMe />
      <Menu />
      <ContactForm />
      <Footer />
    </Main>
  )
}

