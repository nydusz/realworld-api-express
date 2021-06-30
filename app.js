const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const router = require('./router')
const errorHandler = require('./middleware/error-handler')
require('./model')

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

//有环境变量用环境变量 没有用默认3000
const PORT = process.env.PORT || 3000

// 挂载路由
app.use('/api', router)

// 挂载统一处理服务端错误中间件
app.use(errorHandler())

app.listen(PORT, () => {
  console.log(`ruuning at http://localhost:${PORT}`);
})