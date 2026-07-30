import { useState, useEffect } from 'react'

/*
 * ── Adding photos ──────────────────────────────────────────
 * Drop image files into  src/assets/showcase/  and rebuild.
 * That's it — every photo in that folder shows up here
 * automatically. Name a file with "before" or "after" in it
 * (e.g. bella-before.jpg / bella-after.jpg) to get a label.
 */
const modules = import.meta.glob(
  '../assets/showcase/*.{jpg,jpeg,png,webp,gif}',
  { eager: true, import: 'default' }
)

const photos = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, src]) => {
    const name = path.split('/').pop().replace(/\.[^.]+$/, '')
    const lower = name.toLowerCase()
    const label = lower.includes('before') ? 'Before'
                : lower.includes('after')  ? 'After'
                : ''
    return { src, label, alt: `Groomed dog — ${name.replace(/[-_]+/g, ' ')}` }
  })

function Lightbox({ photo, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true">
      <button className="lightbox-close" aria-label="Close photo">×</button>
      <img src={photo.src} alt={photo.alt} onClick={(e) => e.stopPropagation()} />
      {photo.label && <span className="hero-slide-label lightbox-label">{photo.label}</span>}
    </div>
  )
}

export default function Showcase() {
  const [selected, setSelected] = useState(null)

  return (
    <section className="showcase">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Fresh Cuts &amp; Happy Tails</span>
          <h2 className="section-title">Showcase</h2>
          <p className="section-subtitle">
            A few of the wonderful pups who've visited the Cozy K9 Shack.
          </p>
        </div>

        {photos.length === 0 ? (
          <p className="showcase-empty">New photos coming soon — check back!</p>
        ) : (
          <div className="showcase-grid">
            {photos.map((p, i) => (
              <button
                key={i}
                className="showcase-card"
                onClick={() => setSelected(p)}
                aria-label={`View larger: ${p.alt}`}
              >
                <img src={p.src} alt={p.alt} loading="lazy" />
                {p.label && <span className="hero-slide-label">{p.label}</span>}
              </button>
            ))}
          </div>
        )}
      </div>

      {selected && <Lightbox photo={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
