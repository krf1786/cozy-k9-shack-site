// pm2 process config. Keeps the Node server running, restarts it if it
// crashes, and restarts it automatically on VPS reboot (after `pm2 save`
// + `pm2 startup`, see the deploy runbook).
//
// Usage on the VPS (from the project root):
//   pm2 start deploy/ecosystem.config.cjs
//   pm2 save

module.exports = {
  apps: [
    {
      name: 'cozy-k9-shack-site',
      script: 'server/index.js',
      cwd: __dirname + '/..',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}
