// node原生
const crypto = require('crypto')

// 获取crypto 支持的散列算法
// console.log(crypto.getHashes())



module.exports = str => {
  return crypto.createHash('md5').update(str).digest('hex')
}