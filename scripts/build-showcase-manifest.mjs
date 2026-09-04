// Regenerates public/gallery/manifest.json from whatever image files are
// actually in that folder. Runs automatically before `npm run dev` and
// `npm run build` (see package.json) so the manifest never goes stale —
// you never have to hand-edit it.

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { writeManifest } from './showcase-manifest.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SHOWCASE_DIR = path.resolve(__dirname, '..', 'public', 'gallery')

const photos = await writeManifest(SHOWCASE_DIR)
console.log(`Showcase manifest: ${photos.length} photo(s).`)
