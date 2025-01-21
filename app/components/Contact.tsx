"use client"

import { useState, useEffect } from "react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    captchaAnswer: "",
    csrfToken: "",
    honeypot: ""
  })
  const [captchaQuestion, setCaptchaQuestion] = useState("")
  const [formLoadTime, setFormLoadTime] = useState(Date.now())
  const [submissionError, setSubmissionError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Fetch CSRF token and CAPTCHA question when component mounts
    const fetchSecurityData = async () => {
      try {
        const response = await fetch('/api/contact-security')
        const data = await response.json()
        setFormData(prev => ({ ...prev, csrfToken: data.csrfToken }))
        setCaptchaQuestion(data.captchaQuestion)
      } catch (error) {
        console.error("Error fetching security data:", error)
      }
    }
    fetchSecurityData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const validateForm = () => {
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      return "All fields are required"
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return "Please enter a valid email address"
    }

    // Honeypot validation
    if (formData.honeypot) {
      return "Invalid submission"
    }

    // CAPTCHA validation
    if (!formData.captchaAnswer) {
      return "Please complete the CAPTCHA"
    }

    return null
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmissionError("")

    // Time-based validation
    const submissionTime = Date.now()
    if (submissionTime - formLoadTime < 1000) {
      setSubmissionError("Form submitted too quickly")
      setIsSubmitting(false)
      return
    }

    const validationError = validateForm()
    if (validationError) {
      setSubmissionError(validationError)
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Submission failed')
      }

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        message: "",
        captchaAnswer: "",
        csrfToken: "",
        honeypot: ""
      })
      alert("Thank you for your message. We will get back to you soon!")
    } catch (error) {
      setSubmissionError("Failed to submit form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-16 px-4 md:px-8 bg-secondary-bg">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Contact Me</h2>
        {submissionError && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
            {submissionError}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Honeypot field */}
          <div style={{ display: 'none' }}>
            <label htmlFor="honeypot">Leave this field empty</label>
            <input
              type="text"
              id="honeypot"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleChange}
            />
          </div>

          {/* CSRF Token */}
          <input type="hidden" name="csrfToken" value={formData.csrfToken} />

          {/* Name Field */}
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

          {/* Email Field */}
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

          {/* Message Field */}
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

          {/* CAPTCHA Field */}
          <div>
            <label htmlFor="captchaAnswer" className="block mb-2 text-sm font-medium">
              {captchaQuestion}
            </label>
            <input
              type="text"
              id="captchaAnswer"
              name="captchaAnswer"
              value={formData.captchaAnswer}
              onChange={handleChange}
              required
              className="w-full p-3 bg-primary-bg text-primary-text rounded-md focus:outline-none focus:ring-2 focus:ring-accent-blue"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-accent-blue text-primary-text py-3 px-6 rounded-md font-semibold hover:bg-accent-gold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent-gold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : "Let's Talk"}
          </button>
        </form>
      </div>
    </section>
  )
}
