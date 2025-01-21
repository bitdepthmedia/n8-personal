import Link from "next/link"

export default function Footer() {
  return (
    <footer className="py-8 px-4 md:px-8 bg-primary-bg">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-secondary-text mb-4 md:mb-0">
          © {new Date().getFullYear()} Nate Talbot. All rights reserved.
        </p>
        <div className="flex space-x-6">
          <Link
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary-text hover:text-accent-blue transition-colors duration-300"
          >
            LinkedIn
          </Link>
          <Link
            href="https://twitter.com/yourhandle"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary-text hover:text-accent-blue transition-colors duration-300"
          >
            Twitter
          </Link>
        </div>
      </div>
    </footer>
  )
}

