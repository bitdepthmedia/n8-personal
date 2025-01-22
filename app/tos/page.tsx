export default function TOS() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Let's Talk Terms</h1>
      <p className="text-secondary-text mb-8">Last updated: January 21, 2025</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Working Together</h2>
        <p className="text-secondary-text mb-4">
          I believe in transparency and clear expectations—both in business and in how we interact here. This page explains how I handle your information and what you can expect when using this site.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Data & Privacy</h2>
        <p className="text-secondary-text mb-4">
          My contact form uses Google's services in the background to process messages and prevent spam. For transparency about how Google handles data when providing these services, visit: {' '}
          <a 
            href="https://safety.google.com/privacy/privacy-controls/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-blue hover:underline"
          >
            https://safety.google.com/privacy/privacy-controls/
          </a>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">What I Collect</h2>
        <p className="text-secondary-text mb-4">
          When you get in touch, I only collect what's needed to have a meaningful conversation:
        </p>
        <ul className="list-disc pl-6 text-secondary-text mb-4">
          <li>Your name and email</li>
          <li>Your message</li>
          <li>reCAPTCHA verification data</li>
        </ul>
        <p className="text-secondary-text">
          I keep this information private and only use it to respond to your inquiry. Message processing is handled securely through Google's services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">About Those Links & Downloads</h2>
        <p className="text-secondary-text mb-4">
          My site connects you to organizations I work with (like the Detroit Blockchain Center) and includes a media kit. While I vouch for these organizations, they have their own terms and privacy policies. The media kit is for your information—please don't modify or sell its contents without asking first.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Changes & Updates</h2>
        <p className="text-secondary-text mb-4">
          I may update these terms as my work evolves. Any changes take effect as soon as they're posted here.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Questions?</h2>
        <p className="text-secondary-text mb-4">
          Use the contact form to reach out—I'm happy to clarify anything about these terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Legal Framework</h2>
        <p className="text-secondary-text mb-4">
          These terms are governed by federal laws and the laws of Michigan. The formal stuff: this is a binding agreement between us, even though I've kept the language straightforward.
        </p>
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