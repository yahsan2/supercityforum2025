#!/usr/bin/env node

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import os from 'os'
import archiver from 'archiver'

const projectName = 'supercityforum2026'
const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5)
const zipFileName = `${projectName}-${timestamp}.zip`
const desktopPath = path.join(os.homedir(), 'Desktop', zipFileName)

console.log('🚀 ビルドを開始します...')

async function buildAndZip() {
  try {
    // Viteでビルド実行
    console.log('📦 Viteでビルドを実行中...')
    execSync('npx vite build', { stdio: 'inherit' })

    // distフォルダの存在確認
    if (!fs.existsSync('./dist')) {
      throw new Error('distフォルダが見つかりません')
    }

    console.log('🗜️  ZIPファイルを作成中...')

    // ZIPファイルを作成
    const output = fs.createWriteStream(zipFileName)
    const archive = archiver('zip', { zlib: { level: 9 } })

    await new Promise((resolve, reject) => {
      output.on('close', () => {
        const sizeInMB = (archive.pointer() / 1024 / 1024).toFixed(2)
        console.log(`✅ ${zipFileName} が作成されました (${sizeInMB}MB)`)

        // ZIPファイルをDesktopに移動
        try {
          fs.renameSync(zipFileName, desktopPath)
          console.log(`📁 納品用ファイルをDesktopに移動しました: ${desktopPath}`)
        } catch (moveError) {
          console.error(`⚠️  Desktopへの移動に失敗しました: ${moveError.message}`)
          console.log(`📁 納品用ファイル: ${path.resolve(zipFileName)}`)
        }

        resolve()
      })

      output.on('error', reject)
      archive.on('error', reject)

      archive.pipe(output)
      archive.directory('./dist/', false)
      archive.finalize()
    })
  } catch (error) {
    console.error('❌ エラーが発生しました:', error.message)
    process.exit(1)
  }
}

buildAndZip()
