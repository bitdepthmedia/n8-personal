import Image from "next/image"
import { useEffect, useRef } from "react"

export default function Header() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      if (titleRef.current && subtitleRef.current) {
        titleRef.current.style.transform = `translateZ(${scrollPosition * 0.1}px) rotateX(${scrollPosition * 0.05}deg)`
        subtitleRef.current.style.transform = `translateZ(${scrollPosition * 0.05}px) rotateX(${scrollPosition * 0.025}deg)`
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="relative h-screen flex items-center justify-center overflow-hidden perspective-1000">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder.jpg-i6t521hlkxj95oSXQ5KgXRb9NJ30EY.jpeg"
          alt="Nate Talbot"
          layout="fill"
          objectFit="cover"
          objectPosition="center 20%"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-bg/70 to-primary-bg/95"></div>
      </div>
      <div className="relative z-10 text-center px-4 py-6 bg-black bg-opacity-50 rounded-lg mb-12">
        <h1 ref={titleRef} className="text-4xl md:text-6xl font-bold mb-4 text-white">
          Nate Talbot
        </h1>
        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-white font-semibold animate-fade-in-up animation-delay-300"
        >
          The Business Behind Your Business
        </p>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 animate-bounce-arrow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white opacity-60"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </header>
  )
}

