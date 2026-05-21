import { useState } from 'react'

const WEB3FORMS_KEY = 'f7cdcb3b-7af4-4c4c-986c-db5c3ecd8a08'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(false)
    setSending(true)

    const form = e.target
    const data = new FormData(form)
    const payload = { access_key: WEB3FORMS_KEY }
    data.forEach((value, key) => { if (key !== 'botcheck') payload[key] = value })

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setSubmitted(true)
        else throw new Error('Submission failed')
      })
      .catch(() => setError(true))
      .finally(() => setSending(false))
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="section-label">Get In Touch</span>
          <h1 className="page-title">Let's Talk About Your Pup</h1>
          <p className="page-lede">
            Have a question or ready to book? Reach out by phone, email, or the
            form below — I'll get back to you as soon as I can.
          </p>
        </div>
      </section>

      <section className="contact-section">
        <div className="container contact-grid">
          {/* Left — info */}
          <div className="contact-info">
            <h2 className="section-title" style={{ marginBottom: 24 }}>Contact Info</h2>

            <div className="contact-info-row">
              <div className="contact-info-icon">📞</div>
              <div>
                <div className="contact-info-label">Phone</div>
                <a href="tel:2019626176" className="contact-info-value">201.962.6176</a>
              </div>
            </div>

            <div className="contact-info-row">
              <div className="contact-info-icon">✉️</div>
              <div>
                <div className="contact-info-label">Email</div>
                <a href="mailto:jaclyn@cozyk9shack.com" className="contact-info-value">
                  jaclyn@cozyk9shack.com
                </a>
              </div>
            </div>

            <div className="contact-info-row">
              <div className="contact-info-icon">📍</div>
              <div>
                <div className="contact-info-label">Studio Address</div>
                <div className="contact-info-value">
                  104 Bell St.<br />Mount Holly, NC 28120
                </div>
              </div>
            </div>

            <div className="contact-info-row">
              <div className="contact-info-icon">📘</div>
              <div>
                <div className="contact-info-label">Facebook</div>
                <a
                  href="https://www.facebook.com/CozyK9Shack"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-info-value"
                >
                  Cozy K9 Shack
                </a>
              </div>
            </div>

            <div className="contact-info-row">
              <div className="contact-info-icon">💳</div>
              <div>
                <div className="contact-info-label">Accepted Payments</div>
                <div className="contact-info-value">Card · Cash · Venmo · Zelle</div>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="contact-form-wrap">
            <h2 className="section-title" style={{ marginBottom: 8 }}>Send a Message</h2>
            <p style={{ color: 'var(--gray)', marginBottom: 20, fontSize: '.9rem' }}>
              Tell me a bit about your dog and what you're looking for.
            </p>

            {submitted ? (
              <div className="form-success">
                <div style={{ fontSize: '2rem', marginBottom: 8 }}>🐾</div>
                <strong>Thanks for reaching out!</strong>
                <p style={{ marginTop: 6, fontSize: '.92rem' }}>
                  I'll get back to you within a day or two. For a faster reply, give
                  me a call at <a href="tel:2019626176">201.962.6176</a>.
                </p>
              </div>
            ) : (
              <form
                className="contact-form"
                onSubmit={handleSubmit}
              >
                {/* Honeypot — catches spam bots */}
                <input type="checkbox" name="botcheck" style={{ display: 'none' }} />

                <div className="form-row">
                  <label>
                    Your Name
                    <input type="text" name="name" required placeholder="Jane Doe" />
                  </label>
                  <label>
                    Phone
                    <input type="tel" name="phone" placeholder="(555) 555-5555" />
                  </label>
                </div>

                <label>
                  Email
                  <input type="email" name="email" required placeholder="you@example.com" />
                </label>

                <div className="form-row">
                  <label>
                    Dog's Name
                    <input type="text" name="dogName" placeholder="Biscuit" />
                  </label>
                  <label>
                    Breed &amp; Size
                    <input type="text" name="dogBreed" placeholder="Goldendoodle, ~40 lbs" />
                  </label>
                </div>

                <label>
                  What can I help with?
                  <textarea
                    name="message"
                    rows="5"
                    required
                    placeholder="Tell me about your dog and what kind of groom you're hoping to book…"
                  />
                </label>

                {error && (
                  <p style={{ color: 'var(--blush-dark)', fontSize: '.88rem', margin: 0 }}>
                    Something went wrong sending your message. Please try again, or
                    call me at <a href="tel:2019626176">201.962.6176</a>.
                  </p>
                )}

                <button
                  type="submit"
                  className="btn btn-sage"
                  style={{ alignSelf: 'flex-start' }}
                  disabled={sending}
                >
                  {sending ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
