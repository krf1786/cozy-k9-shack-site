import { useState, useEffect } from 'react'

/*
 * ── Adding photos ──────────────────────────────────────────
 * Drop image files into  public/gallery/  and restart the dev
 * server / rebuild — the manifest regenerates automatically
 * (see scripts/build-showcase-manifest.mjs) and every photo in
 * that folder shows up here. Name a file with "before" or
 * "after" in it (e.g. bella-before.jpg / bella-after.jpg) to
 * get a label. Uploaded via the /upload page, photos appear
 * immediately with no rebuild at all.
 *
 * (Photos live under the URL path /gallery/, not /showcase/, so
 * the static file folder never collides with this page's own
 * /showcase route.)
 */
function usePhotos() {
  const [photos, setPhotos] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetch('/gallery/manifest.json', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (!cancelled) setPhotos(Array.isArray(data) ? data : [])
      })
      .catch(() => {
        if (!cancelled) setPhotos([])
      })
    return () => {
      cancelled = true
    }
  }, [])

  return photos
}

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
  const manifest = usePhotos()
  const [selected, setSelected] = useState(null)

  const photos = (manifest || []).map((p) => ({
    src: `/gallery/${p.name}`,
    label: p.label,
    alt: `Groomed dog — ${p.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ')}`,
  }))

  return (
    <section className="showcase">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Fresh Cuts &amp; Happy Tails</span>
          <h2 className="section-title">Showcase</h2>
          <p className="section-subtitle">
            A few of the wonderful pups who have visited the Cozy K9 Shack.
          </p>
        </div>

        {manifest === null ? null : photos.length === 0 ? (
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
