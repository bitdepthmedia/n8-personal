import Link from "next/link"

const services = [
  {
    title: "Business Consulting",
    description: "Strategic insights for your business growth",
    link: "https://inrconsulting.biz",
  },
  {
    title: "AI Integrations",
    description: "Cutting-edge AI solutions for your company",
    link: "https://bitdepthmedia.com",
  },
  {
    title: "Blockchain/Crypto",
    description: "Explore the future of decentralized technology",
    link: "https://detroitblockchaincenter.org",
  },
  {
    title: "Media Kit",
    description: "Download resources and information",
    link: "/NateTalbotMediaKit.zip",
  },
]

export default function Services() {
  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">How The Strategy Aligns</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Link
              key={service.title}
              href={service.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[rgb(20,21,52)] p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent-blue flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">{service.title}</h3>
                <p className="text-gray-300 mb-4">{service.description}</p>
              </div>
              <span className="text-accent-blue font-semibold inline-flex items-center">
                Learn More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

