/*
 * Node/Express server for cozyk9shack.com on a VPS.
 *
 * Replaces the old Cloudflare Worker (worker/index.js, kept only for
 * reference). Serves the static Vite build (dist/) as a single-page app
 * and handles one API endpoint:
 *
 *   POST /api/upload   body: raw JPEG bytes
 *                      header: x-upload-password
 *
 * Showcase photos live in public/gallery/ as plain static files (see
 * scripts/showcase-manifest.mjs) — Vite copies that folder into dist/
 * verbatim at build time. (The URL path is /gallery/, not /showcase/, so
 * this static folder never collides with the React Router /showcase page
 * route — Express would otherwise 301-redirect that page.) Because this
 * server has a real, persistent filesystem (unlike the old Worker), an
 * upload writes the photo straight into dist/gallery/ (the folder actually
 * being served right now) and updates manifest.json there — the photo
 * shows up on the live site immediately, no rebuild. It's also written
 * into public/gallery/ so it survives the next `git pull && npm run build`.
 *
 * Config (see .env.example):
 *   UPLOAD_PASSWORD   shared password for the /upload page
 *   PORT              defaults to 3000
 */

import 'dotenv/config'
import express from 'express'
import path from 'node:path'
import fs from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { nextPhotoName, writeManifest } from '../scripts/showcase-manifest.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DIST_DIR = path.join(ROOT, 'dist')
const DIST_SHOWCASE_DIR = path.join(DIST_DIR, 'gallery')
const SRC_SHOWCASE_DIR = path.join(ROOT, 'public', 'gallery')
const MAX_BYTES = 4 * 1024 * 1024
const PORT = process.env.PORT || 3000

const app = express()
app.use(express.raw({ type: '*/*', limit: '5mb' }))

app.post('/api/upload', async (req, res) => {
  try {
    if (!process.env.UPLOAD_PASSWORD) {
      return res.status(500).json({ error: 'Uploads are not configured yet (missing UPLOAD_PASSWORD).' })
    }
    if (req.headers['x-upload-password'] !== process.env.UPLOAD_PASSWORD) {
      return res.status(401).json({ error: 'Wrong password.' })
    }

    const bytes = req.body
    if (!bytes || bytes.length < 100) return res.status(400).json({ error: 'Empty upload.' })
    if (bytes.length > MAX_BYTES) return res.status(413).json({ error: 'File too large.' })
    if (bytes[0] !== 0xff || bytes[1] !== 0xd8) {
      return res.status(400).json({ error: 'Upload must be a JPEG.' })
    }

    await fs.mkdir(DIST_SHOWCASE_DIR, { recursive: true })
    await fs.mkdir(SRC_SHOWCASE_DIR, { recursive: true })

    const name = await nextPhotoName(DIST_SHOWCASE_DIR)

    // Live folder (instant) + source folder (persists across redeploys).
    await fs.writeFile(path.join(DIST_SHOWCASE_DIR, name), bytes)
    await fs.writeFile(path.join(SRC_SHOWCASE_DIR, name), bytes)
    await writeManifest(DIST_SHOWCASE_DIR)
    await writeManifest(SRC_SHOWCASE_DIR)

    res.json({ ok: true, name })
  } catch (err) {
    console.error('Upload failed:', err)
    res.status(500).json({ error: 'Server error saving the photo.' })
  }
})

// Static assets, then SPA fallback (mirrors the old Worker's
// not_found_handling: "single-page-application").
app.use(express.static(DIST_DIR))
app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`cozy-k9-shack-site listening on port ${PORT}`)
})
