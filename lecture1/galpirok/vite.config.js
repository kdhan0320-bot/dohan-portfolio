import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'

const startupShell = readFileSync(new URL('./src/startup-shell.html', import.meta.url), 'utf8')
const startupRecovery = readFileSync(new URL('./src/startupRecovery.js', import.meta.url), 'utf8')

function startupRecoveryPlugin() {
  return {
    name: 'galpirok-startup-recovery',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        // Keep the encoding declaration first, then install the guard before module requests.
        return html.replace('<!--galpirok-startup-->', startupShell)
          .replace('<meta charset="UTF-8" />', `<meta charset="UTF-8" /><script>${startupRecovery}</script>`)
      },
    },
    generateBundle: { order: 'post', handler(_options, bundle) {
      const page = bundle['index.html']
      if (page) {
        // The rendered HTML names the hashed JS/CSS, so styling changes also
        // change this identifier. No deploy timestamp or CI configuration needed.
        const version = createHash('sha256').update(String(page.source)).digest('hex').slice(0, 16)
        page.source = String(page.source).replace('<meta charset="UTF-8" />',
          `<meta charset="UTF-8" /><meta name="galpirok-build" content="${version}" />`)
        this.emitFile({ type: 'asset', fileName: 'release.json', source: JSON.stringify({ version }) })
      }
      // These two entry URLs were observed in cached public HTML before this guard existed.
      // Keep small recovery bridges so that those documents can reach the current version too.
      for (const name of ['index-B1ncJhLB.js', 'index-lnYHg2Gk.js']) {
        this.emitFile({
          type: 'asset', fileName: `assets/${name}`,
          source: `document.getElementById('root').innerHTML = ${JSON.stringify(startupShell)};\n${startupRecovery}\nwindow.dispatchEvent(new Event('galpirok:startup-failed'));`,
        })
      }
    } },
  }
}

export default defineConfig({
  plugins: [react(), startupRecoveryPlugin()],
  base: process.env.NODE_ENV === 'production' ? '/dohan-portfolio/jobflow-dashboard/' : '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/@supabase/')) return 'supabase'
        },
      },
    },
  },
})
