import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

const DEV_FUNCTIONS = /^\/api\/(chat|transcribe|estimate)(?:\?|$)/

// Serves the Vercel functions in api/ during `vite dev`, so no separate server is needed locally.
function devApiFunctions(): Plugin {
  return {
    name: 'dev-api-functions',
    apply: 'serve',
    configureServer(server) {
      const env = loadEnv(server.config.mode, process.cwd(), '')
      for (const [key, value] of Object.entries(env)) process.env[key] ??= value

      server.middlewares.use(async (req, res, next) => {
        const fn = req.url?.match(DEV_FUNCTIONS)?.[1]
        if (!fn) return next()
        try {
          const chunks: Buffer[] = []
          for await (const chunk of req) chunks.push(chunk as Buffer)

          const headers = new Headers()
          for (const [key, value] of Object.entries(req.headers)) {
            if (value) headers.set(key, Array.isArray(value) ? value.join(', ') : value)
          }
          const request = new Request(`http://${req.headers.host}/api/${fn}`, {
            method: req.method,
            headers,
            body: req.method === 'POST' ? Buffer.concat(chunks) : undefined,
          })

          const mod = await server.ssrLoadModule(`/api/${fn}.js`)
          const handler = mod[req.method ?? 'GET']
          const response: Response = handler
            ? await handler(request)
            : new Response('Method Not Allowed', { status: 405 })

          res.statusCode = response.status
          response.headers.forEach((value, key) => res.setHeader(key, value))
          if (response.body) {
            for await (const chunk of response.body) res.write(chunk)
          }
          res.end()
        } catch (error) {
          server.config.logger.error(String(error))
          res.statusCode = 500
          res.end('Internal error')
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), devApiFunctions()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      }
    }
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Core runtime shared by every page; other libraries split naturally with the pages that use them.
            if (/node_modules[\/](react|react-dom|scheduler|react-router|react-router-dom|react-helmet-async)[\/]/.test(id)) return 'vendor-react'
            if (id.includes('framer-motion') || id.includes('motion-dom') || id.includes('motion-utils')) return 'vendor-framer'
            if (id.includes('lenis')) return 'vendor-lenis'
          }
        },
      },
    },
  },
})
