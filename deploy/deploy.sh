#!/usr/bin/env bash
# Redeploy script — run this ON THE VPS, from the project root
# (~/cozy-k9-shack-site), whenever there's new code to ship:
#
#   ./deploy/deploy.sh
#
# Also what the GitHub Actions workflow runs over SSH on every push to
# main (see .github/workflows/deploy.yml), if that's set up.

set -euo pipefail

echo "==> Pulling latest code"
git pull --ff-only

echo "==> Installing dependencies"
npm ci

echo "==> Building"
npm run build

echo "==> Reloading server (zero-downtime)"
pm2 reload cozy-k9-shack-site

echo "==> Done"
pm2 status cozy-k9-shack-site
