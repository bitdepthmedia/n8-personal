export default function About() {
  return (
    <section id="about" className="py-16 px-4 md:px-8 bg-secondary-bg">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">The Business Behind Your Business. Built Smarter.</h2>
        <div className="space-y-6">
          <h3 className="text-xl font-semibold mb-2 text-white">What I Do</h3>
            <p className="animate-fade-in">
            I design systems, strategies, and structures that keep businesses {" "}
            <span className="text-accent-blue">running smoothly</span> —so founders and executives can focus on growth instead of putting out fires.
            </p>
            <p className="animate-fade-in animation-delay-300">
            I don't just give advice and walk away. I create clear, executable plans and work{" "}
              <span className="text-accent-blue">with your team</span> to make sure everything is aligned—from AI workflows and automation to financial structuring and operations. If something's too complex, inefficient, or just not working, I fix it.</p>
            <p className="animate-fade-in animation-delay-600">
            If you're ready to align your team, build smarter systems, and turn ideas into a business—
              <a href="#contact" className="text-accent-gold font-semibold hover:underline">let's talk</a>.
            </p>
            <h3 className="text-xl font-semibold mb-2 text-white">Who I Work With</h3>
            <p className="animate-fade-in">
            I work with  {" "}
            <span className="text-accent-blue">founders, executives, and organizations </span>
            who need clarity, structure, and real solutions— not just another consultant throwing around buzzwords.
            </p>
            <p className="animate-fade-in animation-delay-300">
            If you need someone to design the {" "}
              <span className="text-accent-blue">blueprint and guide execution</span> , I'm in.</p>
        </div>
      </div>
    </section>
  )
}