const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/realworld', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', err => {
  console.log('MongoDB 数据库连接失败');
})

db.once('open', function () {
  console.log('success');
})

// 组织导出模型类
module.exports = {
  User: mongoose.model('User', require('./user')),
  Article: mongoose.model('Article', require('./article'))
}

// const Cat = mongoose.model('Cat', { name: String })

// const kitty = new Cat({ name: 'Zildjian' })

// kitty.save().then(() => console.log('meow'))