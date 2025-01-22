"use client";

import { useState, useEffect } from "react";

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    recaptchaToken: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  useEffect(() => {
    // Load reCAPTCHA script
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=6Ld3ML8qAAAAAClzPiX0wr7Jx5lSdp0QR36VREwI`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      window.grecaptcha.ready(() => {
        setRecaptchaLoaded(true);
      });
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const getRecaptchaToken = async () => {
    try {
      const token = await window.grecaptcha.execute("6Ld3ML8qAAAAAClzPiX0wr7Jx5lSdp0QR36VREwI", {
        action: "contact_form",
      });
      return token;
    } catch (error) {
      console.error("reCAPTCHA error:", error);
      throw error;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionError("");

    try {
      const recaptchaToken = await getRecaptchaToken();
      
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to submit the form.");
      }

      alert("Thank you for your message. I'll get back to you soon!");
      setFormData({
        name: "",
        email: "",
        message: "",
        recaptchaToken: "",
      });
    } catch (error) {
      setSubmissionError(
        error instanceof Error
          ? error.message
          : "Failed to submit the form. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Contact Me</h2>
        <div className="bg-[rgb(20,21,52)] p-6 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">
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
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
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
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-white">
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
              />
            </div>

            {submissionError && (
              <div className="text-red-600 text-sm">{submissionError}</div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !recaptchaLoaded}
              className="w-full p-3 text-white bg-accent-blue rounded-md font-semibold hover:bg-accent-gold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent-gold disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}