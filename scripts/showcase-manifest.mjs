/*
 * Shared logic for the Showcase page's photo manifest.
 *
 * The site no longer uses Vite's import.meta.glob for showcase photos
 * (that bundles/hashes files at build time, which meant a new photo could
 * only appear after a full rebuild). Instead, photos live in
 * public/gallery/ as plain static files, and a manifest.json alongside
 * them lists what's there. The React page fetches that manifest at
 * runtime, so a file can be added to the folder — by hand, or by the
 * server's upload endpoint — and show up immediately with no rebuild.
 *
 * Used by:
 *   - scripts/build-showcase-manifest.mjs (predev/prebuild hook — keeps
 *     the manifest in sync with whatever files are actually in the folder)
 *   - server/index.js (appends the newly uploaded file on each /api/upload)
 */

import fs from 'node:fs/promises'

const IMAGE_RE = /\.(jpe?g|png|webp|gif)$/i
const PHOTO_N_RE = /^photo(\d+)\.jpg$/

export function labelFor(filename) {
  const lower = filename.toLowerCase()
  if (lower.includes('before')) return 'Before'
  if (lower.includes('after')) return 'After'
  return ''
}

export async function scanShowcaseDir(dir) {
  let entries = []
  try {
    entries = await fs.readdir(dir)
  } catch {
    return []
  }
  const files = entries.filter((f) => IMAGE_RE.test(f))
  files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  return files.map((name) => ({ name, label: labelFor(name) }))
}

export async function writeManifest(dir) {
  const photos = await scanShowcaseDir(dir)
  await fs.mkdir(dir, { recursive: true })
  await fs.writeFile(
    `${dir}/manifest.json`,
    JSON.stringify(photos, null, 2) + '\n'
  )
  return photos
}

// Next free `photoN.jpg` name across the folder, for the upload endpoint.
export async function nextPhotoName(dir) {
  let max = 0
  let entries = []
  try {
    entries = await fs.readdir(dir)
  } catch {
    entries = []
  }
  for (const f of entries) {
    const m = f.match(PHOTO_N_RE)
    if (m) max = Math.max(max, Number(m[1]))
  }
  return `photo${max + 1}.jpg`
}
