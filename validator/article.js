const validate = require('../middleware/validate')
const { body,param } = require('express-validator')
const { Article } = require('../model')
const mongoose = require('mongoose')

exports.createArticle = validate([
  body('article.title').notEmpty().withMessage('文章标题不为空'),
  body('article.description').notEmpty().withMessage('文章标题不为空'),
  body('article.body').notEmpty().withMessage('文章标题不为空')
])



exports.getArticle = validate([
  param('articleId').custom(async value => {
    if (!mongoose.isValidObjectId(value)) {
     return Promise.reject('文章ID类型错误')   //不是异步函数 这样写会失败
      // 同步 失败
      // throw new Error('文章ID类型错误')
    }
    // 同步 成功
    // return true
  })
])

// 更新验证 检验文章是否存在 是否是当前登录用户
exports.updateArticle = [
  validate([
    validate.isValidObjectId(['params'], 'articleId')
  ]),
  async (req, res, next) => {
    const articleId = req.params.articleId
    const article = await Article.findById(articleId)
    req.article = article
    if (!article) {
      return res.status(404).end()
    }
    next()
  },
  async (req, res, next) => {
    if (req.user._id.toString() !== req.article.author.toString()) {
      return res.status(403).end()
    }
    next()
  }
]


// 删除验证
exports.deleteArticle = exports.updateArticle