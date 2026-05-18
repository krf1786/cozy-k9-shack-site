import { Link } from 'react-router-dom'

const credentials = [
  { icon: '🏆', label: 'Voted Best Groomer in Charlotte (2022)' },
  { icon: '🛟', label: 'Fear Free Certified' },
  { icon: '❤️', label: 'CPR Certified' },
  { icon: '🐕', label: 'Active in AKC Conformation Showing' },
]

const values = [
  { icon: '🤝', title: 'Trust', desc: 'Built one calm, gentle visit at a time. Your dog should look forward to grooming, not dread it.' },
  { icon: '🕊️', title: 'Patience', desc: 'I work at your dog\'s pace — wiggly puppy or senior who needs extra care, never rushed.' },
  { icon: '🏡', title: 'Safe Space', desc: 'A quiet, one-on-one home setting means no cages, no chaos, and no overstimulation.' },
  { icon: '💝', title: 'Compassion', desc: 'Every dog is treated like my own — with the same love, attention, and respect.' },
]

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="section-label">Meet Your Groomer</span>
          <h1 className="page-title">Hi, I'm Jaclyn!</h1>
          <p className="page-lede">
            Owner &amp; Pet Groomer at Cozy K9 Shack — Fear Free &amp; CPR certified,
            and proud dog mom.
          </p>
        </div>
      </section>

      <section className="about-page">
        <div className="container about-page-inner">
          <div className="about-page-photo-wrap">
            <img
              src="/jaclyn-photo.jpeg"
              alt="Jaclyn Rischman, Owner and Pet Groomer at Cozy K9 Shack"
              className="about-page-photo"
            />
            <div className="about-img-deco" aria-hidden="true">🐾</div>
          </div>

          <div className="about-page-content">
            <p>
              Dogs have always been at the center of my life — both personally and
              professionally. I'm the proud owner of <strong>both dogs and cats</strong>,
              and I'm actively involved in AKC conformation showing, which has
              given me a deep appreciation for breed standards, structure, coat
              care, and overall canine health.
            </p>

            <p>
              In 2022, I was honored to be voted <strong>Best Groomer in Charlotte</strong>
              {' '}— a recognition that means so much to me because it reflects the
              trust and support of my community and clients.
            </p>

            <p>
              Grooming, to me, is more than haircuts and baths — it's about trust,
              patience, and creating a safe space where dogs feel comfortable being
              themselves. I'm <strong>Fear Free</strong> and <strong>CPR certified</strong>,
              and I take pride in working at each dog's pace, whether it's a wiggly
              puppy experiencing grooming for the first time or a senior dog who
              needs a little extra care.
            </p>

            <p>
              Every dog that comes into my care is treated like my own. My goal is
              always the same: a gentle experience, a happy dog, and an owner who
              feels confident knowing their pup was cared for with compassion and love.
            </p>
          </div>
        </div>
      </section>

      <section className="credentials-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Credentials &amp; Recognition</span>
            <h2 className="section-title">A Bit About My Background</h2>
          </div>
          <div className="credentials-grid">
            {credentials.map((c) => (
              <div key={c.label} className="credential-card">
                <div className="credential-icon">{c.icon}</div>
                <div className="credential-label">{c.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="why" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">My Approach</span>
            <h2 className="section-title">What I Believe In</h2>
          </div>
          <div className="why-grid">
            {values.map((v) => (
              <div key={v.title} className="why-card">
                <div className="why-circle" aria-hidden="true">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container">
          <h2>Let's meet your pup!</h2>
          <p>I'd love to hear about your dog and get them on the schedule.</p>
          <div className="cta-banner-btns">
            <a href="tel:2019626176" className="btn btn-white">📞 Call 201.962.6176</a>
            <Link to="/contact" className="btn-white-outline">Contact Me →</Link>
          </div>
        </div>
      </section>
    </>
  )
}
