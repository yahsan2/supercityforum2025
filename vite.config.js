import { defineConfig } from 'vite'
import { resolve } from 'path'
import { readdirSync } from 'fs'

const rootDir = 'supercityforum2025'

// Get all HTML files in supercityforum2025 directory
const getHtmlFiles = () => {
  const files = readdirSync(rootDir).filter((f) => f.endsWith('.html'))
  return files.reduce((input, file) => {
    input[file.replace('.html', '')] = resolve(__dirname, rootDir, file)
    return input
  }, {})
}

export default defineConfig({
  root: rootDir,
  base: '/tiiki/toc/event/supercityforum2025/',
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    assetsDir: 'assets',
    rollupOptions: {
      input: getHtmlFiles(),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})
