import mysql from 'mysql2/promise.js'
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
    // 允許連線, 數量五個
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
  }
} else {
  // 本地開發模式：使用多個 .env 變數
  dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    // 允許連線, 數量五個
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
  }
}

const connection = mysql.createPool(dbConfig)

// const connection = mysql.createPool({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   // 允許連線, 數量五個
//   waitForConnections: true,
//   connectionLimit: 5,
//   queueLimit: 0,
// });

export default connection
