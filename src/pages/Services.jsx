import { Link } from 'react-router-dom'

const included = [
  { icon: '🛁', label: 'Bath & blow dry' },
  { icon: '🐾', label: 'Nail dremel' },
  { icon: '👂', label: 'Ear cleaning' },
  { icon: '🐕', label: 'Deshedding bath to help reduce shedding' },
]

const addOns = [
  { icon: '🦷', label: 'Teeth brushing' },
  { icon: '👂', label: 'Ear plucking' },
  { icon: '✨', label: 'Gland expression' },
]

const services = [
  {
    icon: '🛁',
    title: 'Bath & Brush',
    desc: 'A thorough, relaxing bath using gentle shampoos and conditioners suited to your dog\'s coat. Includes a professional blow-dry and full brush-out so your pup leaves clean, soft, and smelling wonderful.',
  },
  {
    icon: '✂️',
    title: 'Haircuts & Styling',
    desc: 'Breed-specific cuts or custom styling tailored to your dog\'s coat type, lifestyle, and your personal preferences. From puppy cuts to teddy bear faces — we get the details right.',
  },
  {
    icon: '🐾',
    title: 'Nail Care',
    desc: 'Nail dremel for a smooth, comfortable finish, plus paw-pad inspection. Nail maintenance between full grooms is always complimentary up to 5 weeks.',
  },
  {
    icon: '⭐',
    title: 'Full Groom',
    desc: 'The complete package: bath, blow-dry, haircut, nail dremel, ear cleaning, and deshedding bath. Available add-ons include teeth brushing, ear plucking, and gland expression on request.',
  },
]

export default function Services() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="section-label">Our Services</span>
          <h1 className="page-title">Gentle Grooming, Tailored to Your Pup</h1>
          <p className="page-lede">
            Every visit is unhurried, one-on-one, and designed around your dog's
            individual needs. Here's what we offer.
          </p>
        </div>
      </section>

      <section className="services" style={{ paddingTop: 64 }}>
        <div className="container">
          <div className="services-grid services-grid-detailed">
            {services.map((s) => (
              <div key={s.title} className="service-card service-card-lg">
                <div className="service-icon" aria-hidden="true">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="included-section">
        <div className="container included-grid">
          <div>
            <span className="section-label">Every Groom Includes</span>
            <h2 className="section-title" style={{ marginBottom: 18 }}>What's Always In the Box</h2>
            <p style={{ color: 'var(--gray)', marginBottom: 28, lineHeight: 1.75 }}>
              Every groom at Cozy K9 Shack includes everything your pup needs to
              look and feel their best — no surprise charges for the basics.
            </p>
            <ul className="check-list">
              {included.map((i) => (
                <li key={i.label}>
                  <span className="check-icon">{i.icon}</span>
                  {i.label}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="section-label">Available On Request</span>
            <h2 className="section-title" style={{ marginBottom: 18 }}>Optional Add-Ons</h2>
            <p style={{ color: 'var(--gray)', marginBottom: 28, lineHeight: 1.75 }}>
              Just let me know when you book and I'll add any of these to your
              dog's appointment.
            </p>
            <ul className="check-list">
              {addOns.map((i) => (
                <li key={i.label}>
                  <span className="check-icon">{i.icon}</span>
                  {i.label}
                </li>
              ))}
            </ul>

            <div className="note-card">
              <strong>💚 Complimentary:</strong> Nail maintenance between full grooms
              is always free up to 5 weeks after your appointment.
            </div>
          </div>
        </div>
      </section>

      <section className="services" style={{ background: 'var(--cream)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">See Pricing by Size</h2>
          <p style={{ color: 'var(--gray)', maxWidth: 540, margin: '0 auto 28px', lineHeight: 1.7 }}>
            Pricing varies by your dog's size, coat condition, and any add-ons.
            See full starting prices on the Pricing page.
          </p>
          <Link to="/pricing" className="btn btn-sage">View Pricing →</Link>
        </div>
      </section>
    </>
  )
}
