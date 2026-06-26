// ContactPage.jsx
// The "/contact" route. This is the file that demonstrates the core
// concepts the assignment is grading for: controlled form inputs with
// useState, validation, preventDefault(), and conditional rendering of
// a success message.

import { useState } from 'react'
import { FiMail, FiCheckCircle, FiSend } from 'react-icons/fi'
import toast from 'react-hot-toast'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import InputField from '../components/ui/InputField'
import Button from '../components/ui/Button'

const ContactPage = () => {
  // --- Controlled form state ---
  // All four fields (name, email, subject, message) live in one object so
  // we can update any of them with a single setForm call.
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  // Field-level validation error messages, keyed by field name.
  const [errors, setErrors] = useState({})

  // Tracks whether the (simulated) submit request is in flight, so the
  // submit button can show a loading state.
  const [isLoading, setIsLoading] = useState(false)

  // Once true, we conditionally render the "Message Sent!" confirmation
  // screen instead of the form.
  const [submitted, setSubmitted] = useState(false)

  // Small helper: returns an onChange handler for a given field name.
  // set('name') => (e) => setForm({ ...form, name: e.target.value })
  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  // Checks that every field has a value (and that the email looks valid).
  // Returns an object of error messages — empty object means "all good".
  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.subject.trim()) e.subject = 'Subject is required'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleSubmit = (e) => {
    // Stops the browser's default "reload the page on form submit" behavior.
    e.preventDefault()

    const errs = validate()
    if (Object.keys(errs).length) {
      // Validation failed — show the errors and stop here.
      setErrors(errs)
      return
    }

    setErrors({})
    setIsLoading(true)

    // NOTE: There is no real backend endpoint for this form yet, so this
    // setTimeout simulates a network request. Swap this block out for a
    // real axios.post(...) call once a /contact API route exists.
    setTimeout(() => {
      setIsLoading(false)
      setSubmitted(true)
      toast.success("Message sent! We'll get back to you soon.")
      setForm({ name: '', email: '', subject: '', message: '' }) // reset the form
    }, 800)
  }

  return (
    <div>
      <Navbar />
      <main>
        {/* ---- Page intro ---- */}
        <section
          style={{
            padding: 'var(--space-20) 0',
            background: 'radial-gradient(ellipse at 50% 0%, rgba(108,99,255,0.1) 0%, transparent 60%)',
          }}
        >
          <div className="container" style={{ maxWidth: 800, textAlign: 'center' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 16px',
                background: 'rgba(0,212,170,0.1)',
                borderRadius: 'var(--radius-full)',
                marginBottom: 'var(--space-6)',
                border: '1px solid rgba(0,212,170,0.3)',
              }}
            >
              <FiMail style={{ color: 'var(--color-accent)' }} />
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-accent)' }}>
                Get in Touch
              </span>
            </div>
            <h1 style={{ marginBottom: 'var(--space-6)' }}>
              Contact <span className="gradient-text">Us</span>
            </h1>
            <p style={{ fontSize: 'var(--text-lg)', lineHeight: 1.8 }}>
              Have a question, feedback, or just want to say hi? Fill out the
              form below and our team will get back to you as soon as possible.
            </p>
          </div>
        </section>

        {/* ---- Form card ---- */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container" style={{ maxWidth: 600 }}>
            <div className="card" style={{ padding: 'var(--space-10)' }}>
              {submitted ? (
                // --- Conditional rendering: success state ---
                <div style={{ textAlign: 'center', padding: 'var(--space-8) 0' }}>
                  <FiCheckCircle style={{ fontSize: '3rem', color: 'var(--color-accent)', marginBottom: 'var(--space-4)' }} />
                  <h2 style={{ marginBottom: 'var(--space-3)' }}>Message Sent!</h2>
                  <p style={{ marginBottom: 'var(--space-8)' }}>
                    Thanks for reaching out. We've received your message and
                    will respond shortly.
                  </p>
                  <Button variant="secondary" onClick={() => setSubmitted(false)}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                // --- Conditional rendering: the form itself ---
                <form onSubmit={handleSubmit} className="auth-form">
                  <InputField
                    label="Name"
                    id="name"
                    value={form.name}
                    onChange={set('name')}
                    placeholder="Your full name"
                    error={errors.name}
                    required
                  />
                  <InputField
                    label="Email"
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={set('email')}
                    placeholder="you@example.com"
                    error={errors.email}
                    required
                    autoComplete="email"
                  />
                  <InputField
                    label="Subject"
                    id="subject"
                    value={form.subject}
                    onChange={set('subject')}
                    placeholder="What's this about?"
                    error={errors.subject}
                    required
                  />

                  {/* Message field is a <textarea>, so it's written out by
                      hand instead of reusing InputField (which only renders
                      an <input>). It still follows the same input-group /
                      input-field / input-error-msg CSS classes for a
                      consistent look. */}
                  <div className="input-group">
                    <label htmlFor="message" className="input-label">
                      Message <span style={{ color: 'var(--color-error)' }}>*</span>
                    </label>
                    <textarea
                      id="message"
                      value={form.message}
                      onChange={set('message')}
                      placeholder="Tell us more..."
                      rows={6}
                      className={`input-field ${errors.message ? 'input-field--error' : ''}`}
                      style={{ resize: 'vertical', fontFamily: 'inherit' }}
                    />
                    {errors.message && <span className="input-error-msg">{errors.message}</span>}
                  </div>

                  <Button type="submit" variant="primary" isLoading={isLoading} className="btn--full">
                    <FiSend /> Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default ContactPage
