import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'
import fetchIncludePlugin from './vite-plugin-fetch-include.js'
import { resolve } from 'path'
import { readdirSync } from 'fs'

// Get all HTML files in root directory
const getHtmlFiles = () => {
  const files = readdirSync('.').filter((f) => f.endsWith('.html'))
  return files.reduce((input, file) => {
    input[file.replace('.html', '')] = resolve(__dirname, file)
    return input
  }, {})
}

// Context data for each page
const pageData = {
  index: { pageTitle: 'トップ', activePage: 'index' },
  program: { pageTitle: 'プログラム', activePage: 'program' },
  networking: { pageTitle: '参加者同士の交流', activePage: 'networking' },
  registration: { pageTitle: '申込情報', activePage: 'registration' },
  access: { pageTitle: 'アクセス', activePage: 'access' },
}

export default defineConfig({
  base: '/tiiki/kokusentoc/supercity/supercityforum2026/',
  plugins: [
    fetchIncludePlugin(), // 外部HTMLをfetchして埋め込み（handlebarsは使わない）
  ],
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: getHtmlFiles(),
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(1)
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(extType)) {
            extType = 'img'
          }
          return `assets/${extType}/[name]-[hash][extname]`
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})
