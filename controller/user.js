const { User } = require('../model')
const jwt = require('../util/jwt')
const { jwtSecret } = require('../config/config.default')

exports.register = async (req, res, next) => {
  try {
    // 1.获取请求数据
    console.log(req.body);
    // 2.数据验证
    // 2.1 基本数据验证
    // 2.2 业务数据验证

    // 3.验证通过，将数据保存到数据库
    let user = new User(req.body.user)
    await user.save()
    // 将mongoDB对象转为JSON对象
    user = user.toJSON()

    delete user.password

    // 4.发送成功响应
    res.status(201).json({
      user
    })
  } catch (err) {
    next(err)
  }
}

exports.login = async (req, res, next) => {
  try {
    // 1. 数据验证
    // 2. 生成 token
    const user = req.user.toJSON()
    const token = await jwt.sign({
      userId: user._id
    }, jwtSecret, {
      expiresIn: 60 * 60 * 24
    }) //过期时间
    // 3. 发送成功响应(包含 token 的用户信息)
    delete user.password
    res.status(200).json({
      ...user,
      token
    })
  } catch (err) {
    next(err)
  }
}

exports.getCurrentUser = async (req, res, next) => {
  try {
    res.status(200).json({
      user: req.user
    })
  } catch (err) {
    next(err)
  }
}

exports.updateCurrentUser = async (req, res, next) => {
  try {
    res.send('post /users/login')
  } catch (err) {
    next(err)
  }
}