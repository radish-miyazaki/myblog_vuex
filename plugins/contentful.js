const contentful = require('contentful')

// 開発環境時のみ下書きの記事を表示する
const config = (process.env.NODE_ENV === 'development') ? {
  // 開発環境時の処理
  space: process.env.CTF_SPACE_ID,
  accessToken: process.env.CTF_PREVIEW_ACCESS_TOKEN,
  host: 'preview.contentful.com'
} : {
  // 本番環境時の処理
  space: process.env.CTF_SPACE_ID,
  accessToken: process.env.CTF_CDA_ACCESS_TOKEN
}

const client = contentful.createClient(config)

export default client