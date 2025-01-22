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
  const [scriptError, setScriptError] = useState("");

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey) {
      setScriptError("reCAPTCHA configuration is missing");
      return;
    }

    // Remove any existing reCAPTCHA scripts to prevent duplicates
    const existingScript = document.querySelector('script[src*="recaptcha"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Load reCAPTCHA script
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      // Initialize reCAPTCHA after script loads
      window.grecaptcha?.ready(() => {
        setRecaptchaLoaded(true);
        setScriptError("");
      });
    };

    script.onerror = () => {
      setScriptError("Failed to load reCAPTCHA. Please refresh the page or check your internet connection.");
      setRecaptchaLoaded(false);
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup
      const script = document.querySelector('script[src*="recaptcha"]');
      if (script) {
        document.head.removeChild(script);
      }
      setRecaptchaLoaded(false);
    };
  }, []);

  const getRecaptchaToken = async () => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey) {
      throw new Error("reCAPTCHA site key is missing");
    }

    if (!window.grecaptcha) {
      throw new Error("reCAPTCHA has not been loaded properly");
    }

    try {
      const token = await window.grecaptcha.execute(siteKey, {
        action: "contact_form",
      });
      return token;
    } catch (error) {
      console.error("reCAPTCHA error:", error);
      throw new Error("Failed to verify reCAPTCHA. Please refresh the page and try again.");
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
      if (!recaptchaLoaded) {
        throw new Error("Please wait for the security check to load");
      }

      const recaptchaToken = await getRecaptchaToken();
      // In handleSubmit, right after getRecaptchaToken():
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

      const data = await response.json();

      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 429) {
          throw new Error("Too many attempts. Please wait a moment before trying again.");
        }
        if (response.status === 400 && data.error.includes("reCAPTCHA")) {
          throw new Error("Security verification failed. Please try again or disable any ad blockers.");
        }
        if (response.status === 403) {
          throw new Error("Security check failed. Please ensure you're not using automated tools.");
        }
        throw new Error(data.error || "Failed to submit the form.");
      }

      alert("Thank you for your message. I'll get back to you soon!");
      setFormData({
        name: "",
        email: "",
        message: "",
        recaptchaToken: "",
      });
    } catch (error) {
      let errorMessage = "Failed to submit the form. Please try again.";
      
      if (error instanceof Error) {
        if (error.message.includes("reCAPTCHA") ||
            error.message.includes("Security") ||
            error.message.includes("Too many attempts") ||
            error.message.includes("Invalid email") ||
            error.message.includes("All fields are required")) {
          errorMessage = error.message;
        } else if (error.message.includes("fetch")) {
          errorMessage = "Network error. Please check your internet connection.";
        }
      }
      
      setSubmissionError(errorMessage);
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

            {(submissionError || scriptError) && (
              <div className="text-red-600 text-sm bg-red-100 p-3 rounded-md border border-red-200">
                {submissionError || scriptError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !recaptchaLoaded || !!scriptError}
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