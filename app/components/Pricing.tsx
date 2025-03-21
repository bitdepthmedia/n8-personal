export default function Pricing() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header section with improved alignment and structure */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold mb-3">Nate Talbot</h1>
        <h2 className="text-2xl text-accent-gold font-semibold mb-2">Systems Architect & Strategic Advisor</h2>
        <p className="text-lg font-medium">The Business Behind Your Business. Built Smarter.</p>
      </div>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-8 text-center">Engagement Options & Rates</h2>
        
        {/* Strategic Systems Advisory */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4">1. Strategic Systems Advisory (On-Demand Consulting)</h3>
          
          <div className="mb-6">
            <h4 className="text-lg font-medium mb-2 text-accent-blue">Hourly Engagement:</h4>
            <ul className="space-y-2 text-secondary-text">
              <li>• <span className="font-semibold text-white">$400/hr</span> – Single-session ad hoc consulting calls. <span className="italic">(For urgent or one-time needs.)</span></li>
              <li>• <span className="font-semibold text-white">$300/hr</span> – Pre-scheduled consulting, strategy sessions, or attending key meetings (legal, financial, operational).</li>
            </ul>
          </div>
          
          <div className="mb-6">
            <h4 className="text-lg font-medium mb-2 text-accent-blue">Retainer-Based Engagements:</h4>
            <ul className="space-y-2 text-secondary-text">
              <li>• <span className="font-semibold text-white">Tier 1:</span> Priority access, up to <span className="font-semibold text-white">10 hours/month</span> – <span className="font-semibold text-white">$2,500/month</span></li>
              <li>• <span className="font-semibold text-white">Tier 2:</span> Priority access, up to <span className="font-semibold text-white">20 hours/month</span> – <span className="font-semibold text-white">$4,500/month</span></li>
            </ul>
          </div>
          
          <div className="mb-4">
            <p className="text-secondary-text"><span className="font-semibold text-white">Note:</span> Retainers ensure <span className="font-semibold text-white">priority availability and strategic continuity.</span> Unused hours <span className="font-semibold text-white">do not roll over.</span></p>
          </div>
          
          <div>
            <p className="text-secondary-text"><span className="font-semibold text-white">Best for:</span> Founders, executives, and teams who need ongoing advisory access but don't require full-scale systems design.</p>
          </div>
        </div>
        
        {/* Systems Architect */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4">2. Systems Architect (Comprehensive Strategy & Implementation Oversight)</h3>
          
          <div className="mb-6">
            <h4 className="text-lg font-medium mb-2 text-accent-blue">Retainer-Based Engagements:</h4>
            <ul className="space-y-2 text-secondary-text">
              <li>• <span className="font-semibold text-white">Tier 1:</span> Priority access, up to <span className="font-semibold text-white">20 hours/month</span> – <span className="font-semibold text-white">$5,000/month</span></li>
              <li>• <span className="font-semibold text-white">Tier 2:</span> Priority access, up to <span className="font-semibold text-white">40 hours/month</span> – <span className="font-semibold text-white">$9,500/month</span></li>
            </ul>
          </div>
          
          <div className="mb-4">
            <p className="text-secondary-text"><span className="font-semibold text-white">Note:</span> Retainer includes <span className="font-semibold text-white">ongoing access and oversight</span>, ensuring systems, teams, and workflows stay aligned. <span className="font-semibold text-white">Unused hours do not roll over.</span></p>
          </div>
          
          <div>
            <p className="text-secondary-text"><span className="font-semibold text-white">Best for:</span> Businesses aiming for <span className="font-semibold text-white">scalable growth</span>, requiring long-term strategic alignment across teams, workflows, and technology.</p>
          </div>
        </div>
        
        {/* Project-Based System Design */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4">3. Project-Based System Design & Implementation</h3>
          
          <div className="mb-4 text-secondary-text">
            <p>• <span className="font-semibold text-white">Pricing:</span> Custom, based on scope and complexity <span className="italic">(starting at $10,000).</span></p>
          </div>
          
          <div className="mb-4 text-secondary-text">
            <p>• <span className="font-semibold text-white">Scope:</span></p>
            <ul className="ml-6 space-y-2">
              <li>• <span className="font-semibold text-accent-blue">AI & automation strategy</span> – LLM-driven workflows, trading bots, automation design</li>
              <li>• <span className="font-semibold text-accent-blue">Business & financial structuring</span> – Compliance frameworks, operational efficiency</li>
              <li>• <span className="font-semibold text-accent-blue">System optimization & implementation</span> – Designing smarter processes for scaling businesses</li>
            </ul>
          </div>
          
          <div>
            <p className="text-secondary-text"><span className="font-semibold text-white">Best for:</span> Organizations needing <span className="font-semibold text-white">structured, executable plans</span> in areas like AI, crypto, finance, or operations.</p>
          </div>
        </div>
        
        {/* Equity Considerations */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4">Equity Considerations</h3>
          
          <ul className="space-y-2 text-secondary-text">
            <li>• <span className="font-semibold text-white">Equity is not a substitute for payment.</span></li>
            <li>• Equity deals are only considered <span className="font-semibold text-white">when tied to clear milestones or revenue commitments.</span></li>
            <li>• No "advisory-for-equity" arrangements without a <span className="font-semibold text-white">defined value exchange.</span></li>
          </ul>
        </div>
        
        {/* Scope & Boundaries */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4">Scope & Boundaries</h3>
          
          <ul className="space-y-2 text-secondary-text">
            <li>• I do not provide <span className="font-semibold text-white">legal, tax, or accounting services.</span></li>
            <li>• I work <span className="font-semibold text-white">alongside</span> your professional team to ensure that business, legal, financial, and operational strategies stay <span className="font-semibold text-white">aligned with your vision—not theirs.</span></li>
            <li>• My role is <span className="font-semibold text-white">to design the strategy, structure, and execution plan—not to operate as an executor or employee.</span></li>
          </ul>
        </div>
        
        {/* Getting Started */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4">Getting Started</h3>
          
          <p className="text-secondary-text mb-4">If you're building or scaling and need your systems to keep up, let's talk.</p>
        </div>
      </section>

      <div className="mt-12">
        <a
          href="/"
          className="text-accent-blue hover:underline"
        >
          ← Return to Main Page
        </a>
      </div>
    </div>
  )
}