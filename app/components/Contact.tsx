"use client"

import { useState } from "react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically send the form data to your server
    console.log("Form submitted:", formData)
    // Reset form after submission
    setFormData({ name: "", email: "", message: "" })
    alert("Thank you for your message. We will get back to you soon!")
  }

  return (
    <section className="py-16 px-4 md:px-8 bg-secondary-bg">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Contact Me</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 bg-primary-bg text-primary-text rounded-md focus:outline-none focus:ring-2 focus:ring-accent-blue"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 bg-primary-bg text-primary-text rounded-md focus:outline-none focus:ring-2 focus:ring-accent-blue"
            />
          </div>
          <div>
            <label htmlFor="message" className="block mb-2 text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full p-3 bg-primary-bg text-primary-text rounded-md focus:outline-none focus:ring-2 focus:ring-accent-blue"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-accent-blue text-primary-text py-3 px-6 rounded-md font-semibold hover:bg-accent-gold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent-gold"
          >
            Let's Talk
          </button>
        </form>
      </div>
    </section>
  )
}

