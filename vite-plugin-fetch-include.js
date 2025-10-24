import { readFileSync } from 'fs'
import { resolve } from 'path'

export default function fetchIncludePlugin() {
  return {
    name: 'vite-plugin-fetch-include',
    enforce: 'pre',
    async transformIndexHtml(html) {
      console.log('🔍 Checking for placeholders in HTML...')
      console.log('Has {{> header}}:', html.includes('{{> header}}'))
      console.log('Has {{> footer}}:', html.includes('{{> footer}}'))

      // ローカルパーシャルファイルのパス
      const headerPath = resolve(__dirname, 'src/partials/header.hbs')
      const footerPath = resolve(__dirname, 'src/partials/footer.hbs')

      // ヘッダーを取得
      if (html.includes('{{> header}}')) {
        try {
          const headerHtml = readFileSync(headerPath, 'utf-8')
          html = html.replace('{{> header}}', headerHtml)
          console.log('✅ Header replaced from local file:', headerPath)
        } catch (error) {
          console.error('❌ Failed to read header file:', error)
        }
      }

      // フッターを取得
      if (html.includes('{{> footer}}')) {
        try {
          const footerHtml = readFileSync(footerPath, 'utf-8')
          html = html.replace('{{> footer}}', footerHtml)
          console.log('✅ Footer replaced from local file:', footerPath)
        } catch (error) {
          console.error('❌ Failed to read footer file:', error)
        }
      }

      return html
    },
  }
}
