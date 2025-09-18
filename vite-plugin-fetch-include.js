import fetch from 'node-fetch'

export default function fetchIncludePlugin() {
  return {
    name: 'vite-plugin-fetch-include',
    enforce: 'pre',
    async transformIndexHtml(html) {
      console.log('🔍 Checking for placeholders in HTML...')
      console.log('Has {{> header}}:', html.includes('{{> header}}'))
      console.log('Has {{> footer}}:', html.includes('{{> footer}}'))

      const headerUrl = 'https://www.chisou.go.jp/common/inc/include_header.html'
      const footerUrl = 'https://www.chisou.go.jp/common/inc/include_footer.html'

      // CSS includes を追加
      const cssIncludes = `
        <!-- 政府サイト共通CSS読み込み -->
        <link rel="icon" href="https://www.chisou.go.jp/common/img/favicon.ico">
        <link rel="stylesheet" href="https://www.chisou.go.jp/common/bootstrap/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://www.chisou.go.jp/common/css/common_header.css">
        <link rel="stylesheet" href="https://www.chisou.go.jp/common/css/common_footer.css">
        <link rel="stylesheet" href="https://www.chisou.go.jp/common/css/sousei_contents.css">
        <link rel="stylesheet" href="https://www.chisou.go.jp/common/css/all.min.css">
        <!-- 政府サイト共通JS読み込み -->
        <script src="https://www.chisou.go.jp/common/js/jquery-3.7.1.min.js"></script>
        <script src="https://www.chisou.go.jp/sousei/common/chisou/js/jquery.flexnav.js"></script>
        <script src="https://www.chisou.go.jp/sousei/common/chisou/js/slick.min.js"></script>
        <script src="https://www.chisou.go.jp/common/js/common.js"></script>
        <script src="https://www.chisou.go.jp/common/js/script.js"></script>
      `

      // ヘッダーを取得
      if (html.includes('{{> header}}')) {
        const headerResponse = await fetch(headerUrl)
        if (!headerResponse.ok) {
          throw new Error(`Failed to fetch header: ${headerResponse.status} ${headerResponse.statusText}`)
        }
        let headerHtml = await headerResponse.text()
        // BOMを削除
        headerHtml = headerHtml.replace(/^\uFEFF/, '')
        // 画像パスを絶対URLに変換
        headerHtml = headerHtml.replace(/src="\/sousei\//g, 'src="https://www.chisou.go.jp/sousei/')
        headerHtml = headerHtml.replace(/href="\/sousei\//g, 'href="https://www.chisou.go.jp/sousei/')
        // CSSとヘッダーを一緒に挿入
        html = html.replace('{{> header}}', cssIncludes + '\n' + headerHtml)
        console.log('✅ Header replaced from:', headerUrl)
      }

      // フッターを取得
      if (html.includes('{{> footer}}')) {
        const footerResponse = await fetch(footerUrl)
        if (!footerResponse.ok) {
          throw new Error(`Failed to fetch footer: ${footerResponse.status} ${footerResponse.statusText}`)
        }
        let footerHtml = await footerResponse.text()
        // BOMを削除
        footerHtml = footerHtml.replace(/^\uFEFF/, '')
        // 画像パスを絶対URLに変換
        footerHtml = footerHtml.replace(/src="\/sousei\//g, 'src="https://www.chisou.go.jp/sousei/')
        footerHtml = footerHtml.replace(/href="\/sousei\//g, 'href="https://www.chisou.go.jp/sousei/')
        html = html.replace('{{> footer}}', footerHtml)
        console.log('✅ Footer replaced from:', footerUrl)
      }

      return html
    },
  }
}
