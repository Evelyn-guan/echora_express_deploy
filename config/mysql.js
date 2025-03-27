import mysql from 'mysql2/promise.js'

// 讀取.env檔用
import 'dotenv/config.js'

let dbConfig

if (process.env.DATABASE_URL) {
  // Railway 部署模式：使用 DATABASE_URL
  const dbUrl = new URL(process.env.DATABASE_URL)

  dbConfig = {
    host: dbUrl.hostname,
    user: dbUrl.username,
    port: parseInt(dbUrl.port),
    password: dbUrl.password,
    database: dbUrl.pathname.replace('/', ''),
    dateStrings: true,
  }
} else {
  // 本地開發模式：使用多個 .env 變數
  dbConfig = {
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      dateStrings: true, 
  }
}

const db = mysql.createPool(dbConfig)

// 資料庫連結資訊
// const db = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USERNAME,
//   port: process.env.DB_PORT,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   dateStrings: true, // 轉換日期字串格式用
// })

// 輸出模組
export default db
