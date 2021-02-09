// const e = require('express')
let mysql = require('mysql')

let options = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'jiebao'
}


var xmMysql = (sql, ...params) => {
  return new Promise((resolve, reject) => {
    let con = mysql.createConnection(options)
    // 创建数据连接
    con.connect(err => {
      if (err) {
        reject(err)
      }
    })
    con.query(sql, ...params, (err, res) => {
      con.end()
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

module.exports = xmMysql

