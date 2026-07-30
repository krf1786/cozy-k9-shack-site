import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import photo4 from '../assets/showcase/photo4.jpg'
import photo5 from '../assets/showcase/photo5.jpg'

const slides = [
  { src: '/hero-dog.png',      label: '',       alt: 'Happy groomed dog' },
  { src: '/photo1-before.jpg', label: 'Before', alt: 'Dog before grooming 1' },
  { src: '/photo1-after.jpg',  label: 'After',  alt: 'Dog after grooming 1' },
  { src: '/photo2-before.jpg', label: 'Before', alt: 'Dog before grooming 2' },
  { src: '/photo2-after.jpg',  label: 'After',  alt: 'Dog after grooming 2' },
  { src: '/photo3-before.jpg', label: 'Before', alt: 'Dog before grooming 3' },
  { src: '/photo3-after.jpg',  label: 'After',  alt: 'Dog after grooming 3' },
  { src: photo4,               label: '',       alt: 'Freshly groomed dog in a blue bandana' },
  { src: photo5,               label: '',       alt: 'Freshly groomed dog in a pink bandana' },
]

function HeroSlideshow() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="hero-slideshow" style={{ position: 'relative' }}>
      {slides.map((slide, i) => (
        <div key={i} className={`hero-slide${i === current ? ' is-active' : ''}`} style={{ position: 'relative' }}>
          <img src={slide.src} alt={slide.alt} className="hero-dog-photo" style={slide.label ? { objectPosition: 'center 30%' } : {}} />
          {slide.label && <span className="hero-slide-label">{slide.label}</span>}
        </div>
      ))}
      <div className="hero-slide-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`hero-slide-dot${i === current ? ' is-active' : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

const services = [
  { icon: '🛁', title: 'Bath & Brush', desc: "Relaxing bath, gentle shampoo, conditioning, blow-dry and brush-out." },
  { icon: '✂️', title: 'Haircuts & Styling', desc: "Custom haircuts tailored to your dog's breed, coat, and lifestyle." },
  { icon: '🐾', title: 'Nail Care', desc: 'Nail dremel and filing for healthy paws and happy walks.' },
  { icon: '⭐', title: 'Full Groom', desc: 'The works! Bath, dry, haircut, nail care, ear cleaning, and more.' },
]

const whyItems = [
  { icon: '🏡', title: 'Calm Environment', desc: 'No busy salons or loud noises. Just a peaceful home setting where your pup can relax.' },
  { icon: '🐕', title: 'One-on-One Care', desc: "Your dog gets my full attention from start to finish — no cages, no shortcuts." },
  { icon: '💚', title: 'Affordable Pricing', desc: 'High-quality grooming without the high price tag, because every pup deserves it.' },
  { icon: '✨', title: 'Personalized Service', desc: "Every dog is unique. I tailor each groom to their needs and your preferences." },
]

const testimonials = [
  { stars: 5, text: '"Jaclyn is amazing! My dog is anxious but she made him feel so comfortable. He looks and smells fantastic!"', name: '— Melissa R.' },
  { stars: 5, text: '"So convenient having grooming come to our home. Jaclyn is kind, patient, and truly loves what she does."', name: '— Amanda K.' },
  { stars: 5, text: '"The best groomer we\'ve ever had! Personalized care and such a calm experience for our pup."', name: '— Tyler S.' },
]

function Hero() {
  return (
    <section className="hero">
      <span className="hero-paw hero-paw-1" aria-hidden="true">🐾</span>
      <span className="hero-paw hero-paw-2" aria-hidden="true">🐾</span>
      <span className="hero-paw hero-paw-3" aria-hidden="true">🐾</span>

      <div className="container hero-inner">
        <div>
          <h1>Stress-Free</h1>
          <div className="hero-sub">In-Home Pet Grooming</div>

          <p className="hero-desc">
            Home-based dog grooming dedicated to providing a safe, stress-free
            grooming experience in a quiet, one-on-one environment.
          </p>

          <div className="hero-btns">
            <Link to="/contact" className="btn btn-sage">📞 Book Now</Link>
            <Link to="/services" className="btn btn-light">Learn More</Link>
          </div>

          <div className="hero-trust">
            <div className="hero-trust-card">
              <div className="hero-trust-icon">🌿</div>
              <div className="hero-trust-text">Stress-Free<br />Convenience</div>
            </div>
            <div className="hero-trust-card">
              <div className="hero-trust-icon">🐾</div>
              <div className="hero-trust-text">One-on-One<br />Care</div>
            </div>
            <div className="hero-trust-card">
              <div className="hero-trust-icon">🏡</div>
              <div className="hero-trust-text">Safe, Calm<br />Environment</div>
            </div>
          </div>
        </div>

        <div className="hero-image-wrap">
          <div className="hero-image-frame">
            <HeroSlideshow />
          </div>
          <div className="hero-badge-card" aria-hidden="true">
            <div className="hero-badge-card-icon">🐾</div>
            <div className="hero-badge-card-text">happy clean<br />tail wags</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section className="services">
      <div className="container">
        <div className="section-header">
          <span className="section-label">What I Offer</span>
          <h2 className="section-title">My Grooming Services</h2>
          <p className="section-subtitle">Gentle care, beautiful results.</p>
        </div>
        <div className="services-grid">
          {services.map((s) => (
            <div key={s.title} className="service-card">
              <div className="service-icon" aria-hidden="true">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <Link to="/services" className="service-link">Learn More →</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhyChoose() {
  return (
    <section className="why">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Why Choose Cozy K9 Shack?</h2>
        </div>
        <div className="why-grid">
          {whyItems.map((item) => (
            <div key={item.title} className="why-card">
              <div className="why-circle" aria-hidden="true">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutPreview() {
  return (
    <section className="about">
      <div className="container about-inner">
        <div>
          <div className="about-img-wrap">
            <img
              src="/hero-dog.png"
              alt="Jaclyn Rischman, Owner and Pet Groomer at Cozy K9 Shack"
              className="about-img"
            />
            <div className="about-img-deco" aria-hidden="true">🐾</div>
          </div>
        </div>

        <div className="about-content">
          <h2 className="section-title">Hi, I'm Jaclyn!</h2>
          <div className="about-role">Owner, Pet Groomer · Fear Free &amp; CPR Certified</div>

          <p>
            Dogs have always been at the center of my life — both personally and
            professionally. I'm the proud owner of a few wonderful dogs and a
            purrrrfectly beautiful cat, and I'm actively involved in AKC
            Conformation Showing.
          </p>
          <p>
            In 2022, I was honored to be voted <strong>"Best Groomer"</strong> in Charlotte.
          </p>
          <p>
            Every dog that comes into my care is treated like one of my own!
          </p>

          <div className="about-cta">
            <Link to="/about" className="btn btn-sage">❤ Learn More About Me</Link>
          </div>
        </div>

        <div className="about-contact-col">
          <div className="about-contact-row">
            <div className="about-contact-icon" aria-hidden="true">📍</div>
            <div>
              <div className="about-contact-label">Address</div>
              <div className="about-contact-value">104 Bell St.<br />Mount Holly, NC 28120</div>
            </div>
          </div>
          <div className="about-contact-row">
            <div className="about-contact-icon" aria-hidden="true">📞</div>
            <div>
              <div className="about-contact-label">Phone</div>
              <div className="about-contact-value"><a href="tel:2019626176">201.962.6176</a></div>
            </div>
          </div>
          <div className="about-contact-row">
            <div className="about-contact-icon" aria-hidden="true">✉️</div>
            <div>
              <div className="about-contact-label">Email</div>
              <div className="about-contact-value"><a href="mailto:jaclyn@cozyk9shack.com">jaclyn@cozyk9shack.com</a></div>
            </div>
          </div>
          <div className="about-contact-row">
            <div className="about-contact-icon" aria-hidden="true">🌐</div>
            <div>
              <div className="about-contact-label">Website</div>
              <div className="about-contact-value">www.cozyk9shack.com</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="testimonials">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Happy Pups, Happy Parents</h2>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <div className="stars">{'★'.repeat(t.stars)}</div>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">{t.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <WhyChoose />
      <AboutPreview />
      <Testimonials />
    </>
  )
}
