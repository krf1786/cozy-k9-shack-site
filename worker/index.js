/*
 * Cloudflare Worker for cozyk9shack.com.
 *
 * Serves the static site (dist/) and one API endpoint:
 *
 *   POST /api/upload   body: processed JPEG bytes
 *                      header: x-upload-password
 *
 * A valid upload is committed to the GitHub repo as the next
 * src/assets/showcase/photoN.jpg, which triggers the normal
 * Cloudflare build → the photo appears on the Showcase page.
 *
 * Requires two secrets (Cloudflare dashboard → Workers & Pages →
 * cozy-k9-shack-site → Settings → Variables and Secrets):
 *   GITHUB_TOKEN     fine-grained PAT, Contents read/write on the repo
 *   UPLOAD_PASSWORD  shared password for the /upload page
 */

const REPO = 'krf1786/cozy-k9-shack-site'
const FOLDER = 'src/assets/showcase'
const MAX_BYTES = 4 * 1024 * 1024

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    if (url.pathname === '/api/upload' && request.method === 'POST') {
      return handleUpload(request, env)
    }
    return env.ASSETS.fetch(request)
  },
}

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })

async function handleUpload(request, env) {
  if (!env.GITHUB_TOKEN || !env.UPLOAD_PASSWORD) {
    return json({ error: 'Uploads are not configured yet (missing secrets).' }, 500)
  }
  if (request.headers.get('x-upload-password') !== env.UPLOAD_PASSWORD) {
    return json({ error: 'Wrong password.' }, 401)
  }

  const bytes = new Uint8Array(await request.arrayBuffer())
  if (bytes.length < 100) return json({ error: 'Empty upload.' }, 400)
  if (bytes.length > MAX_BYTES) return json({ error: 'File too large.' }, 413)
  if (bytes[0] !== 0xff || bytes[1] !== 0xd8) {
    return json({ error: 'Upload must be a JPEG.' }, 400)
  }

  const gh = {
    Authorization: `Bearer ${env.GITHUB_TOKEN}`,
    'User-Agent': 'cozy-k9-shack-uploader',
    Accept: 'application/vnd.github+json',
  }

  // Next free photoN.jpg number in the showcase folder
  const listRes = await fetch(`https://api.github.com/repos/${REPO}/contents/${FOLDER}`, {
    headers: gh,
  })
  if (!listRes.ok) {
    return json({ error: `Could not list photos (GitHub ${listRes.status}).` }, 502)
  }
  let max = 0
  for (const f of await listRes.json()) {
    const m = f.name.match(/^photo(\d+)\.jpg$/)
    if (m) max = Math.max(max, Number(m[1]))
  }
  const name = `photo${max + 1}.jpg`

  const putRes = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${FOLDER}/${name}`,
    {
      method: 'PUT',
      headers: gh,
      body: JSON.stringify({
        message: `Add showcase ${name} (uploaded from the site)`,
        content: base64(bytes),
      }),
    }
  )
  if (!putRes.ok) {
    return json({ error: `Could not save photo (GitHub ${putRes.status}).` }, 502)
  }

  return json({ ok: true, name })
}

function base64(bytes) {
  let bin = ''
  const chunk = 0x8000
  for (let i = 0; i < bytes.length; i += chunk) {
    bin += String.fromCharCode(...bytes.subarray(i, i + chunk))
  }
  return btoa(bin)
}
