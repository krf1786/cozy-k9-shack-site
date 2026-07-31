import { useState, useRef } from 'react'

/*
 * Hidden photo-upload page (/upload — not linked in the nav).
 *
 * Each chosen photo is processed right here in the browser —
 * orientation fixed, resized to 1500px wide, compressed to JPEG —
 * then sent to the site's /api/upload endpoint, which adds it to
 * the Showcase page. Password required (set on the server).
 */

const MAX_WIDTH = 1500
const JPEG_QUALITY = 0.82

async function processImage(file) {
  let bitmap
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' })
  } catch {
    bitmap = await createImageBitmap(file) // older browsers
  }
  let { width, height } = bitmap
  if (width > MAX_WIDTH) {
    height = Math.round((height * MAX_WIDTH) / width)
    width = MAX_WIDTH
  }
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  canvas.getContext('2d').drawImage(bitmap, 0, 0, width, height)
  bitmap.close()
  const blob = await new Promise((resolve) =>
    canvas.toBlob(resolve, 'image/jpeg', JPEG_QUALITY)
  )
  if (!blob) throw new Error('could not convert')
  return blob
}

export default function Upload() {
  const [password, setPassword] = useState(
    () => localStorage.getItem('ck9-upload-pw') || ''
  )
  const [items, setItems] = useState([]) // { key, fileName, status, note }
  const [busy, setBusy] = useState(false)
  const inputRef = useRef(null)

  const setItem = (key, patch) =>
    setItems((list) =>
      list.map((it) => (it.key === key ? { ...it, ...patch } : it))
    )

  const handleFiles = async (fileList) => {
    const files = Array.from(fileList)
    if (!files.length) return
    localStorage.setItem('ck9-upload-pw', password)
    setBusy(true)

    const batch = files.map((f, i) => ({
      key: Date.now() + '-' + i,
      fileName: f.name,
      status: 'working',
      note: 'Preparing…',
    }))
    setItems((list) => [...list, ...batch])

    // One at a time, so each photo gets the next number in order
    for (let i = 0; i < files.length; i++) {
      const { key } = batch[i]
      try {
        const blob = await processImage(files[i])
        setItem(key, { note: 'Uploading…' })
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'image/jpeg',
            'x-upload-password': password,
          },
          body: blob,
        })
        const data = await res.json().catch(() => ({}))
        if (!res.ok) throw new Error(data.error || `Upload failed (${res.status})`)
        setItem(key, { status: 'done', note: `Saved as ${data.name}` })
      } catch (err) {
        setItem(key, {
          status: 'error',
          note:
            err.message === 'could not convert'
              ? "Couldn't read this photo — try a JPG or PNG."
              : err.message,
        })
      }
    }
    setBusy(false)
  }

  const anyDone = items.some((it) => it.status === 'done')

  return (
    <section className="upload-page">
      <div className="container" style={{ maxWidth: 560 }}>
        <div className="section-header">
          <span className="section-label">Owner Area</span>
          <h1 className="section-title">Upload Showcase Photos</h1>
          <p className="section-subtitle">
            Pick photos, and they'll be resized and added to the Showcase
            page automatically.
          </p>
        </div>

        <label className="upload-field">
          Upload password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="current-password"
          />
        </label>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: 'none' }}
          onChange={(e) => {
            handleFiles(e.target.files)
            e.target.value = ''
          }}
        />

        <button
          type="button"
          className="btn btn-sage upload-choose"
          disabled={busy || !password}
          onClick={() => inputRef.current.click()}
        >
          {busy ? 'Working…' : '📷 Choose Photos'}
        </button>
        {!password && (
          <p className="upload-hint">Enter the password first.</p>
        )}

        {items.length > 0 && (
          <ul className="upload-list">
            {items.map((it) => (
              <li key={it.key} className={`upload-item is-${it.status}`}>
                <span className="upload-item-icon">
                  {it.status === 'done' ? '✅' : it.status === 'error' ? '⚠️' : '⏳'}
                </span>
                <span className="upload-item-name">{it.fileName}</span>
                <span className="upload-item-note">{it.note}</span>
              </li>
            ))}
          </ul>
        )}

        {anyDone && (
          <p className="upload-hint">
            All set! The site rebuilds itself — new photos show up on the
            Showcase page in about two minutes.
          </p>
        )}
      </div>
    </section>
  )
}
